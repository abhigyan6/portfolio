"use client";

import { useEffect, useRef, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);

        // Fade out preloader after a brief pause
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transform = "translateY(-100%)";
            containerRef.current.style.opacity = "0";
          }
          // Remove from DOM after animation
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 300);
      }
      setProgress(current);
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050508]"
      style={{
        transition: "transform 1s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.8s ease",
      }}
    >
      {/* Progress number */}
      <div className="text-[20vw] md:text-[15vw] font-black tracking-tighter text-white leading-none select-none">
        {progress}
      </div>

      {/* Progress bar */}
      <div className="w-48 h-[1px] bg-neutral-800 mt-8 overflow-hidden">
        <div
          className="h-full bg-white"
          style={{
            width: `${progress}%`,
            transition: "width 0.15s ease",
          }}
        />
      </div>
    </div>
  );
}
