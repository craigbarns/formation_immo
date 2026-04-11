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
}

export function Slider({ label, value, onChange, min, max, step, format }: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm text-white/70">{label}</label>
        <span className="text-sm font-semibold text-[#d4af37]">
          {format ? format(value) : value}
        </span>
      </div>
      <div className="relative h-6 flex items-center">
        <input
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
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-[#d4af37] to-[#f0c040] transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className={`absolute h-4 w-4 bg-[#d4af37] rounded-full shadow-lg transition-transform ${
            isDragging ? "scale-125" : "scale-100"
          }`}
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
}
