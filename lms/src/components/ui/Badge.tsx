import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "navy" | "success" | "warning" | "danger" | "info" | "ghost";
  size?: "sm" | "md";
  dot?: boolean;
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  dot,
  children,
  ...props
}: BadgeProps) {
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/80",
    gold: "bg-brand-gold/15 text-brand-navy ring-1 ring-brand-gold/25",
    navy: "bg-brand-navy/10 text-brand-navy ring-1 ring-brand-navy/20",
    success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80",
    warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/80",
    danger: "bg-red-50 text-red-700 ring-1 ring-red-200/80",
    info: "bg-sky-50 text-sky-700 ring-1 ring-sky-200/80",
    ghost: "bg-transparent text-zinc-500",
  };

  const sizes: Record<NonNullable<BadgeProps["size"]>, string> = {
    sm: "px-2.5 py-0.5 text-3xs",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold leading-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            variant === "success" && "bg-emerald-500",
            variant === "warning" && "bg-amber-500",
            variant === "danger" && "bg-red-500",
            variant === "info" && "bg-sky-500",
            variant === "gold" && "bg-brand-gold",
            variant === "navy" && "bg-brand-navy",
            variant === "default" && "bg-zinc-400",
          )}
        />
      )}
      {children}
    </span>
  );
}
