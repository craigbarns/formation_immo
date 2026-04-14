import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "flat" | "warm";
  hover?: boolean;
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "elevated", hover: hoverable = true, children, ...props }, ref) => {
    const variants: Record<NonNullable<CardProps["variant"]>, string> = {
      default: "border border-zinc-200/80 bg-white",
      elevated:
        "rounded-2xl border border-zinc-200/90 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_40px_rgba(26,58,92,0.07)]",
      flat: "border border-zinc-200/60 bg-zinc-50/50",
      warm: "border border-zinc-200/80 bg-brand-gold-soft",
    };

    const hover = hoverable
      ? "transition duration-300 hover:border-brand-navy/15 hover:shadow-[0_8px_32px_rgba(26,58,92,0.12)]"
      : "";

    return (
      <div
        ref={ref}
        className={cn(variants[variant], hover, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 pt-5 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 pb-5 pt-2", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-bold text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1 text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
