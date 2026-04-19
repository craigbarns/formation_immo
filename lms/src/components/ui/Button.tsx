import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold outline-none transition-all duration-200 rounded-xl " +
      "focus-ring-brand disabled:pointer-events-none disabled:opacity-50 " +
      "active:scale-[0.98] select-none";

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary: "bg-brand-navy text-white shadow-md shadow-brand-navy/20 hover:bg-brand-navy-deep",
      secondary: "bg-white text-brand-navy ring-1 ring-zinc-200/90 shadow-sm hover:bg-zinc-50 hover:ring-brand-navy/15",
      outline: "border-2 border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10",
      ghost: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
      gold: "bg-brand-gold text-brand-navy shadow-md shadow-black/10 hover:brightness-[1.05]",
      danger: "bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700",
    };

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
