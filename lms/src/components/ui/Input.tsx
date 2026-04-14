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
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-zinc-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-xl border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900",
            "placeholder:text-zinc-400",
            "outline-none transition duration-150",
            "focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20",
            "hover:border-zinc-300",
            "disabled:pointer-events-none disabled:opacity-50",
            error && "border-red-300 focus:border-red-400 focus:ring-red-400/20",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : description ? `${inputId}-desc` : undefined
          }
          {...props}
        />
        {description && !error && (
          <p id={`${inputId}-desc`} className="text-xs text-zinc-500">
            {description}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600" role="alert">
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
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-zinc-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-xl border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900",
            "placeholder:text-zinc-400",
            "outline-none transition duration-150",
            "focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20",
            "hover:border-zinc-300",
            "disabled:pointer-events-none disabled:opacity-50",
            error && "border-red-300 focus:border-red-400 focus:ring-red-400/20",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : description ? `${textareaId}-desc` : undefined
          }
          {...props}
        />
        {description && !error && (
          <p id={`${textareaId}-desc`} className="text-xs text-zinc-500">
            {description}
          </p>
        )}
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
