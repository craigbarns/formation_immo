"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  overlayClassName,
}: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
            overlayClassName
          )}
          ref={overlayRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) onOpenChange(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "dialog-title" : undefined}
          aria-describedby={description ? "dialog-desc" : undefined}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xl",
              className
            )}
          >
            {(title || description) && (
              <div className="flex items-start justify-between px-6 pt-5 pb-2">
                <div className="flex-1">
                  {title && (
                    <h2 id="dialog-title" className="text-lg font-bold text-zinc-900">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="dialog-desc" className="mt-1 text-sm text-zinc-500">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DialogFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex items-center justify-end gap-2 px-6 pb-5 pt-2", className)}>
      {children}
    </div>
  );
}
