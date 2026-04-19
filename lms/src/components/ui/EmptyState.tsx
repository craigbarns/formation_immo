import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  variant?: "default" | "dark";
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  variant = "default",
}: EmptyStateProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border px-6 py-12 text-center",
        isDark
          ? "border-white/10 bg-brand-navy/50"
          : "border-zinc-200/80 bg-white",
        className
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-2xl",
          isDark ? "bg-white/10" : "bg-brand-gold-soft"
        )}
      >
        <Icon
          className={cn(
            "h-6 w-6",
            isDark ? "text-brand-gold" : "text-brand-navy"
          )}
        />
      </div>
      <h3
        className={cn(
          "mt-4 text-sm font-bold",
          isDark ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "mt-1.5 max-w-xs text-xs leading-relaxed",
            isDark ? "text-white/80" : "text-zinc-500"
          )}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
