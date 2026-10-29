// Render alias for the reference's CAPITALIZED href (The reference's sidebar link points at /Goals.)
// A route FOLDER (not a next.config redirect) because Next.js matches
// config redirects CASE-INSENSITIVELY; route folders are case-exact on
// the filesystem, so the alias can never fight the canonical route.
// NOTE: this alias is a .jsx file ON PURPOSE — TypeScript's TS1149 fires
// whenever ONE program includes two real files whose paths differ ONLY
// in casing. The .jsx extension keeps the alias out of that collision
// and compiles identically through SWC. The lowercase page.tsx stays
// canonical.
import GoalsPage from "../goals/page";

export default function GoalsCapitalRoute() {
  return <GoalsPage />;
}
