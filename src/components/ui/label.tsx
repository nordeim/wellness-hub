"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHECKBOX } from "@/lib/page-layout";

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

// Session-17 (S17-P3): the STOCK Radix-style checkbox — the reference
// ships button-role checkboxes (`<button type="button" role="checkbox"
// aria-checked data-state value="on">`) on EVERY filter rail (accounts
// tiers / calendar types+dates / activities Activity-Type + the by-type
// footer), with a Check h-4 w-4 indicator that mounts ONLY when checked.
// The button element keeps keyboard semantics native (Space/Enter fire
// click on buttons) and the label's htmlFor still forwards clicks to a
// labelable button. Ours shipped native inputs with appearance-none
// styling — no check glyph ever rendered, the checked fill was the app
// blue (the reference's computes #171717, the dark stock primary), and
// the focus ring was 2px translucent blue instead of the 1px near-black.
//
// WH-12 (F-2): the invented arms retired — the `label`/`id` pair (the
// htmlFor render arm), `defaultChecked` (the entire uncontrolled
// machinery) and `className` carried zero pass sites: both live callers
// (the Profile page's Preferences pair) are CONTROLLED — checked +
// onCheckedChange, aria-label riding the ...props spread, the wrapping
// parent <label> associating without an id (the Session-71 hideClose
// class: invented surface needs live consumers). CHECKBOX.row/label
// retired from page-layout with the arm.

interface CheckboxProps extends Omit<React.ComponentProps<"button">, "onChange" | "value"> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function Checkbox({ checked, onCheckedChange, ...props }: CheckboxProps) {
  const toggle = () => {
    onCheckedChange(!checked);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      value="on"
      className={CHECKBOX.control}
      onClick={toggle}
      {...props}
    >
      {checked ? (
        <span data-state="checked" className={CHECKBOX.indicator} style={{ pointerEvents: "none" }}>
          <Check className="h-4 w-4" />
        </span>
      ) : null}
    </button>
  );
}

export { Label, Checkbox };
