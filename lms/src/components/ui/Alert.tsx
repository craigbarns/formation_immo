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
    classes: "border-sky-200/80 bg-sky-50/80 text-sky-800",
    iconClasses: "text-sky-500",
  },
  success: {
    icon: CheckCircle2,
    classes: "border-emerald-200/80 bg-emerald-50/80 text-emerald-800",
    iconClasses: "text-emerald-500",
  },
  warning: {
    icon: TriangleAlert,
    classes: "border-amber-200/80 bg-amber-50/80 text-amber-800",
    iconClasses: "text-amber-500",
  },
  danger: {
    icon: AlertCircle,
    classes: "border-red-200/80 bg-red-50/80 text-red-800",
    iconClasses: "text-red-500",
  },
};

export function Alert({ className, variant = "info", title, icon, children, ...props }: AlertProps) {
  const { icon: Icon, classes, iconClasses } = variantConfig[variant];

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border px-4 py-3.5 text-sm",
        classes,
        className
      )}
      role="alert"
      {...props}
    >
      {icon ?? <Icon className={cn("h-5 w-5 shrink-0 translate-y-px", iconClasses)} />}
      <div className="flex flex-col gap-0.5">
        {title && <p className="font-semibold">{title}</p>}
        <div className="opacity-85">{children}</div>
      </div>
    </div>
  );
}
