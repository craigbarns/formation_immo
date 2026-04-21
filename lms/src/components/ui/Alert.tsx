import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
  icon?: React.ReactNode;
}

const variantConfig = {
  info: {
    icon: Info,
    classes: "border-sky-500/20 bg-sky-500/5 text-sky-200",
    iconClasses: "text-sky-400",
  },
  success: {
    icon: CheckCircle2,
    classes: "border-emerald-500/20 bg-emerald-500/5 text-emerald-200",
    iconClasses: "text-emerald-400",
  },
  warning: {
    icon: TriangleAlert,
    classes: "border-amber-500/20 bg-amber-500/5 text-amber-200",
    iconClasses: "text-amber-400",
  },
  danger: {
    icon: AlertCircle,
    classes: "border-red-500/20 bg-red-500/5 text-red-200",
    iconClasses: "text-red-400",
  },
};

export function Alert({ className, variant = "info", title, icon, children, ...props }: AlertProps) {
  const { icon: Icon, classes, iconClasses } = variantConfig[variant];

  return (
    <div
      className={cn(
        "flex gap-4 rounded-2xl border p-5 text-sm backdrop-blur-xl shadow-2xl",
        classes,
        className
      )}
      role="alert"
      {...props}
    >
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-lg", iconClasses)}>
        {icon ?? <Icon className="h-6 w-6" />}
      </div>
      <div className="flex flex-col gap-1 justify-center">
        {title && <p className="font-black uppercase tracking-widest text-[10px] opacity-60">{title}</p>}
        <div className="font-medium leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}
