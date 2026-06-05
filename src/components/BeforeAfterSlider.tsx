/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  title: string;
  subtitle: string;
}

export default function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  title,
  subtitle,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="bg-slate-50/50 rounded-2xl p-6 border border-rose-100 shadow-sm">
      <div className="mb-4">
        <h4 className="font-serif text-lg font-medium text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-100 animate-pulse" />
          {title}
        </h4>
        <p className="text-xs text-slate-500 font-sans mt-0.5">{subtitle}</p>
      </div>

      <div
        id="ba-slider-container"
        ref={containerRef}
        className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden select-none cursor-ew-resize border border-rose-100 shadow-inner"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* BEFORE IMAGE (Background) */}
        <img
          src={beforeUrl}
          alt="Before treatment"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 bottom-4 bg-slate-900/80 backdrop-blur-sm text-[10px] uppercase tracking-widest text-[#fff] font-bold px-2.5 py-1 rounded-full shadow-md z-10">
          BEFORE
        </div>

        {/* AFTER IMAGE (Overlay clipped by slider position) */}
        <img
          src={afterUrl}
          alt="After treatment glow"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          referrerPolicy="no-referrer"
        />
        <div 
          className="absolute left-4 bottom-4 bg-[#7a1c43]/80 backdrop-blur-sm text-[10px] uppercase tracking-widest text-[#fff] font-bold px-2.5 py-1 rounded-full shadow-md z-10 pointer-events-none"
          style={{ opacity: sliderPosition > 12 ? 1 : 0, transition: "opacity 0.2s" }}
        >
          AFTER
        </div>

        {/* DRAG HANDLE BAR */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize z-20 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-amber-400 text-amber-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <ArrowLeftRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      <span className="block text-center text-[11px] text-slate-400 mt-3 font-sans italic">
        ← Drag or slide the handle to compare transformation →
      </span>
    </div>
  );
}
