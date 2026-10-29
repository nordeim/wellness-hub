import * as React from "react";
import { INPUT_BASE } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      // Session-7: stock shadcn base — rounded-md (the reference's toolbar
      // searches and settings inputs all use the stock rounded-md input,
      // verified live on the contacts search).
      // Session-9 (S9-12, S9-16): `text-base md:text-sm` (16px below md —
      // the reference's phones render 16px input text) and a 1px near-black
      // focus ring with the border color unchanged (ring-ring).
      // Session-10 (S10-2): the reference's stock Input is bg-transparent
      // (no bg class — the surface shows through, exactly like the live
      // computed probes) with NO text color class — typed text inherits its
      // --foreground #0a0a0a (text-ink) and placeholders use #737373
      // (--color-muted-ink). Ours shipped bg-white + #111827 + #9ca3af.
      className={cn(
        `flex h-9 w-full rounded-md border border-line ${INPUT_BASE.bg} px-3 py-1 ${INPUT_BASE.size} ${INPUT_BASE.ink} shadow-sm ${INPUT_BASE.transition} ${INPUT_BASE.file} ${INPUT_BASE.placeholder} ${INPUT_BASE.focusRing} disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      {...props}
    />
  );
}

// WH-8 (F-5): the Textarea wrapper retired — zero importers since the
// build commit (no wellness surface renders a textarea; the module
// dialogs ride Input/Select). The ui-export census owns the class.

export { Input };
