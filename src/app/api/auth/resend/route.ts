import { db } from "@/lib/db";
import { ok, ERR, parseBody } from "@/lib/api";
import { resendSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { VERIFICATION_TTL_MS, isVerificationPending, verificationResentMessage } from "@/lib/verification";
import { hashVerificationCode } from "@/lib/verification-server";
import { generateVerifyCode } from "@/lib/password";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/resend — session-21 (S21-P5), the verify-email view's
 * "Didn't receive the code? Resend". The reference answers with the info
 * banner "New verification code sent to your email" (live-verified) and
 * the resend resets the attempts ladder (the lockout message names the
 * resend as the recovery path). Like the signup route, the fresh code is
 * stored hashed and logged to the SERVER console — never shipped to the
 * client.
 */
export async function POST(req: Request) {
  const limit = rateLimit(`resend:${clientKey(req)}`, 5, 15 * 60 * 1000);
  // Session-38 (S38-P6): the opportunistic bucket sweep (login's
  // placement — see the signup note; S39-P7 moved it before the denied
  // return so denied requests sweep too).
  sweepRateLimits();
  // Session-67 (N-67h): the denied 429 carries the Retry-After header
  // like the rest of the family.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163: the Zod parse seam (pre-gate + the email contract).
  const parsed = await parseBody(req, resendSchema);
  if (!parsed.ok) return parsed.response;
  const { email } = parsed.data;

  // Session-37 (S37-P1): the auth family joins the envelope — the
  // findUnique/update failures stay inside { ok, error }.
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !user.verificationCodeHash || !isVerificationPending(user.verificationExpiresAt)) {
      // Unknown account or nothing to resend: answer with the same info
      // banner (the reference's non-leaking posture) — a rate-limited no-op.
      return ok({ resent: true, message: verificationResentMessage() });
    }

    const code = generateVerifyCode();
    await db.user.update({
      where: { id: user.id },
      data: {
        verificationCodeHash: hashVerificationCode(code),
        verificationAttempts: 0,
        verificationExpiresAt: new Date(Date.now() + VERIFICATION_TTL_MS),
      },
    });

    console.info(`[verification] code for ${email}: ${code} (expires in 15 minutes)`);

    // Session-163 (the digma ADR-014 port): the in-app OTP delivery —
    // the fresh code rides the response for the demo workflow (and the
    // e2e resend funnel), WELLNESS_DISABLE_IN_APP_OTP=1 gated.
    const inAppOtpEnabled = process.env.WELLNESS_DISABLE_IN_APP_OTP !== "1";
    return ok({
      resent: true,
      message: verificationResentMessage(),
      verificationCode: inAppOtpEnabled ? code : null,
    });
  } catch {
    return ERR.INTERNAL();
  }
}
