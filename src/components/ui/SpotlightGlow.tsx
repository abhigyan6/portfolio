"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SpotlightGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      // Use GSAP for buttery smooth tracking
      gsap.to(glowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[60vw] h-[60vw] rounded-full pointer-events-none z-[5]"
      style={{
        background: "radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, rgba(0,0,0,0) 60%)",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
