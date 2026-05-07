import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-8 py-16 text-center shadow-2xl backdrop-blur-xl",
        className
      )}
    >
      <div
        className="relative flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl group"
      >
        <div className="absolute inset-0 rounded-full blur-2xl bg-brand-gold/10 animate-pulse" />
        <Icon
          className="relative h-8 w-8 text-slate-300 dark:text-white/20 group-hover:text-brand-gold transition-colors"
        />
      </div>
      <h3
        className="mt-8 text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight"
      >
        {title}
      </h3>
      {description && (
        <p
          className="mt-4 max-w-sm text-base leading-relaxed text-slate-500 dark:text-white/50 font-medium italic"
        >
          &laquo; {description} &raquo;
        </p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
