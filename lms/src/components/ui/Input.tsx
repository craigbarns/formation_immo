import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, description, id, type = "text", ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/75 ml-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "flex h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white font-bold",
            "placeholder:text-slate-400 dark:placeholder:text-white/75",
            "outline-none transition-all duration-300 backdrop-blur-xl shadow-2xl",
            "focus:border-brand-gold/50 focus:ring-4 focus:ring-brand-gold/10",
            "hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20",
            "disabled:pointer-events-none disabled:opacity-50",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : description ? `${inputId}-desc` : undefined
          }
          {...props}
        />
        {description && !error && (
          <p id={`${inputId}-desc`} className="text-[10px] text-slate-400 dark:text-white/75 italic ml-1">
            {description}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400 font-bold ml-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, description, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/75 ml-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "flex min-h-[100px] w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white font-bold",
            "placeholder:text-slate-400 dark:placeholder:text-white/75",
            "outline-none transition-all duration-300 backdrop-blur-xl shadow-2xl",
            "focus:border-brand-gold/50 focus:ring-4 focus:ring-brand-gold/10",
            "hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20",
            "disabled:pointer-events-none disabled:opacity-50",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : description ? `${textareaId}-desc` : undefined
          }
          {...props}
        />
        {description && !error && (
          <p id={`${textareaId}-desc`} className="text-[10px] text-slate-400 dark:text-white/75 italic ml-1">
            {description}
          </p>
        )}
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-red-400 font-bold ml-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
