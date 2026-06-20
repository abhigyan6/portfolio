"use client";

import { useEffect, useRef, useState } from "react";
import { playTick } from "@/utils/sound";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    // Smooth ring follow with lerp
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };

    let currentHoveredEl: Element | null = null;

    const handleHover = () => {
      playTick();
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(255,255,255,0.6)";
    };

    const handleUnhover = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "transparent"; // Hide border because SVG circle takes over
    };

    const handleScroll = () => {
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", handleScroll, { passive: true });
    animateRing();

    const interactiveSelector = "a, button, .interactive-hover, h1";

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(interactiveSelector);
      if (target) {
        if (currentHoveredEl !== target) {
          currentHoveredEl = target;
          handleHover();
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(interactiveSelector);
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (target && (!relatedTarget || !relatedTarget.closest(interactiveSelector))) {
        currentHoveredEl = null;
        handleUnhover();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // Calculate SVG stroke offset based on scroll progress
  // Circumference of a circle with r=18 is 2 * PI * 18 = 113.1
  const circumference = 113.1;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-white/80 pointer-events-none z-[999] shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{ transition: "none" }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="hidden md:flex fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[999] items-center justify-center backdrop-blur-[2px] bg-white/5"
        style={{
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      >
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 40 40">
          {/* Background track */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
          />
          {/* Progress fill */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-150 ease-out"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
