"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DIALOG_CLOSE,
  DIALOG_CONTENT,
  DIALOG_HEADER,
  DIALOG_OVERLAY,
  DIALOG_TITLE,
} from "@/lib/page-layout";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  // Session-15 (S15-P2): the reference ships the STOCK black/80 fade —
  // NO backdrop blur (our scaffold's gray-900/45 + blur(2px) wash retired).
  return (
    <DialogPrimitive.Overlay
      className={cn(
        DIALOG_OVERLAY,
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  // Session-15 (S15-P1): the STOCK shadcn geometry — `w-full` (FULL-BLEED
  // at phone widths, not calc(100vw-2rem)), `sm:rounded-lg` (0 radius
  // below 640), shadow-lg, and the slide-in/out animations the scaffold
  // never shipped. WH-8: the portal rides the primitive directly — the
  // DialogPortal re-export retired with its zero importers (the ui-export
  // census owns the class); the events dialog overrides the width cap via
  // `className={DIALOG_CONTENT.wide}` (max-w-2xl, 672px).
  // Session-71 (L-71d4): the invented `hideClose` prop retired — zero
  // consumers since its scaffold birth, not stock shadcn (the N-57
  // dead-prop class); the close button renders unconditionally.
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          DIALOG_CONTENT.base,
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className={DIALOG_CLOSE}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  // Session-15 (S15-P3): the reference centers the title below sm
  // (`text-center sm:text-left`) — the stock shadcn header. The old
  // pr-6 clearance is gone (the X is the opacity pattern now).
  return <div className={cn(DIALOG_HEADER, className)} {...props} />;
}

// WH-22: DialogFooter + DialogDescription retired with their last
// consumer (the Routines Schedule modal) — the seven create-forms went
// inline at WH-21 (FORM_CARD carries their footer; their headers are
// title-only) and the Schedule modal's content moved into the
// SCHEDULE_MODAL record (the description rides the gradient tile; the
// primary is w-full ALONE — no footer wrapper). The ui-export census
// owns the live set.

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  // Session-13 (S13-P9): the stock string — `text-lg font-semibold
  // leading-none tracking-tight` (reference class dump), inheriting the
  // #0a0a0a default foreground.
  return <DialogPrimitive.Title className={cn(DIALOG_TITLE, className)} {...props} />;
}

export {
  Dialog,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
};
