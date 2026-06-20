"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_SEQUENCE = [
  "[ OK ] Mounting System Architecture...",
  "[ OK ] Initializing WebGL Renderer...",
  "[ OK ] Loading 3D Physics Engine...",
  "[ OK ] Connecting Audio Engine...",
  "[ OK ] Calibrating Visual Effects...",
  "[ OK ] Rendering Starfield...",
  "[ OK ] Compiling Shaders...",
  "[ OK ] Loading Portfolio...",
  "[ OK ] Welcome — Abhigyan Dwivedi",
  "READY."
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex >= BOOT_SEQUENCE.length) {
        clearInterval(interval);
        return;
      }

      const nextLog = BOOT_SEQUENCE[currentIndex];
      if (nextLog) {
        setLogs((prev) => [...prev, nextLog]);
      }
      
      currentIndex++;

      if (currentIndex >= BOOT_SEQUENCE.length) {
        clearInterval(interval);
        
        // Pause on ACCESS GRANTED, then violently shatter/fade out
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transform = "scale(1.1)";
            containerRef.current.style.opacity = "0";
            containerRef.current.style.filter = "blur(10px) brightness(2)";
          }
          // Remove from DOM after animation
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 600);
      }
    }, 120); // Fast firing terminal

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-end p-8 md:p-12 bg-[#000000] overflow-hidden"
      style={{
        transition: "all 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div className="flex flex-col gap-2 font-mono text-xs md:text-sm tracking-widest uppercase">
        {logs.map((log, index) => (
          <div 
            key={index} 
            className={`${log?.includes("WARN") ? "text-red-500" : log?.includes("READY.") ? "text-green-400 font-bold" : "text-neutral-500"} animate-pulse`}
          >
            {log}
          </div>
        ))}
        {/* Blinking cursor */}
        {logs.length < BOOT_SEQUENCE.length && (
          <div className="w-3 h-4 bg-white animate-ping mt-1" />
        )}
      </div>
    </div>
  );
}
