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
      default: "border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5",
      elevated:
        "rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-2xl backdrop-blur-md",
      flat: "border border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.02]",
      warm: "border border-brand-gold/20 bg-brand-gold/5",
    };

    const hover = hoverable
      ? "transition-all duration-500 hover:border-brand-gold/20 hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:shadow-brand-gold/5"
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
    <div className={cn("px-8 pt-8 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-8 py-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-8 pb-8 pt-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-2 text-base text-slate-500 dark:text-white/50 leading-relaxed font-medium italic", className)} {...props}>
      {children}
    </p>
  );
}
