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
    default: "bg-white/5 text-white/70 ring-1 ring-white/10",
    gold: "bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/30",
    navy: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20",
    success: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20",
    warning: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20",
    danger: "bg-red-500/15 text-red-400 ring-1 ring-red-500/20",
    info: "bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/20",
    ghost: "bg-transparent text-white/40",
  };

  const sizes: Record<NonNullable<BadgeProps["size"]>, string> = {
    sm: "px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest",
    md: "px-3 py-1 text-xs font-black uppercase tracking-widest",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full leading-none backdrop-blur-md transition-all",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full animate-pulse",
            variant === "success" && "bg-emerald-400",
            variant === "warning" && "bg-amber-400",
            variant === "danger" && "bg-red-400",
            variant === "info" && "bg-sky-400",
            variant === "gold" && "bg-brand-gold",
            variant === "navy" && "bg-blue-400",
            variant === "default" && "bg-white/40",
          )}
        />
      )}
      {children}
    </span>
  );
}
