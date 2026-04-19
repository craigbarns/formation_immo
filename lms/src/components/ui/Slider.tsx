"use client";

import { useState } from "react";

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (value: number) => string;
  id?: string;
}

export function Slider({ label, value, onChange, min, max, step, format, id }: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;
  const sliderId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={sliderId} className="text-sm text-zinc-600">
          {label}
        </label>
        <span className="text-sm font-semibold text-brand-gold" aria-live="polite">
          {format ? format(value) : value}
        </span>
      </div>
      <div className="relative flex h-6 items-center">
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
        />
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full bg-gradient-to-r from-brand-gold to-[var(--brand-gold-light)] transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className={`absolute h-4 w-4 rounded-full bg-brand-gold shadow-lg transition-transform duration-100 ${
            isDragging ? "scale-125" : "scale-100"
          }`}
          style={{ left: `calc(${percentage}% - 8px)` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
