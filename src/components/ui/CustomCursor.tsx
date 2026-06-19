"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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

    const handleHover = () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(255,255,255,0.6)";
    };

    const handleUnhover = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(255,255,255,0.25)";
    };

    window.addEventListener("mousemove", moveCursor);
    animateRing();

    // Track hover on interactive elements
    const interactiveEls = document.querySelectorAll("a, button, [data-hover]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll("a, button, [data-hover]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleUnhover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[999] mix-blend-difference"
        style={{ transition: "none" }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-[999] mix-blend-difference"
        style={{
          borderColor: "rgba(255,255,255,0.25)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />
    </>
  );
}
