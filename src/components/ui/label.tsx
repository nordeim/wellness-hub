"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      // Session-13 (S13-P13): the STOCK shadcn Label — `text-sm font-medium
      // leading-none peer-disabled:cursor-not-allowed
      // peer-disabled:opacity-70` (reference class dump on the reference's
      // create-dialog labels, 14px — the same Label face the wellness
      // module dialogs ship; the CRM-era "New Account" measurement-site
      // narration retired at WH-8). Ours shipped a 12px text-xs custom
      // with a /80 foreground wash.
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

// WH-25: the Checkbox component RETIRED with its false premise — the
// WH-21 claim "the reference ships ZERO checkboxes" was written without
// opening the Preferences tab; the live read shows NATIVE bare
// input[type=checkbox] w-5 h-5 controls there. The CRM-chassis custom
// form (the Session-17 button-role model), its WH-21 dark-state cure,
// its interaction-contrast pin and its a11y (e) leg all shipped on the
// untested premise. The Preferences pair now renders the native form
// (the PROFILE_PREFS.checkbox member) — the ui-export census owns this
// module's surface.

export { Label };
