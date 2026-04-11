"use client";

import { motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, Trophy, AlertTriangle } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning" | "achievement";

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-500",
    progress: "bg-emerald-500",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    iconColor: "text-red-500",
    progress: "bg-red-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-500",
    progress: "bg-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-500",
    progress: "bg-amber-500",
  },
  achievement: {
    icon: Trophy,
    bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
    border: "border-amber-300",
    iconColor: "text-amber-500",
    progress: "bg-gradient-to-r from-amber-400 to-yellow-400",
  },
};

export function Toast({ type, title, message, onClose }: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative overflow-hidden rounded-xl border ${config.bg} ${config.border} shadow-lg min-w-[320px] max-w-[420px]`}
    >
      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: type === "achievement" ? 6 : 4, ease: "linear" }}
        className={`absolute bottom-0 left-0 right-0 h-1 origin-left ${config.progress}`}
      />

      <div className="flex items-start gap-3 p-4">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-900">{title}</h4>
          {message && (
            <p className="mt-1 text-sm text-gray-600">{message}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Glow effect for achievements */}
      {type === "achievement" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-amber-400/20 blur-xl" />
        </div>
      )}
    </motion.div>
  );
}
