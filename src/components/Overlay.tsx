"use client";

import { useEffect } from "react";
import Navbar from "./ui/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import CustomCursor from "./ui/CustomCursor";

export default function Overlay() {
  useEffect(() => {
    // LIMIT BREAK: The "Inspect Element" Trap (The Console Flex)
    console.log("%cOh, you're looking for my source code? How cute.", "color: #ffffff; font-size: 18px; font-weight: bold; background: #000000; padding: 10px 20px; border-radius: 4px; font-family: monospace; border: 1px solid #333;");
    console.log("%cYou are currently looking at a live feed of 60fps tensor math.\nGood luck copying this.", "color: #ff0055; font-size: 14px; font-family: monospace; padding-top: 10px; font-weight: bold;");
    console.log("%cDrop me a line: abhigyanforwork@gmail.com", "color: #a0a0a0; font-size: 14px; font-family: monospace; padding-top: 10px;");

    // The Intimidation Loop: Simulated WebGL Math Stream
    const intv = setInterval(() => {
      // Only log if console is open/active to prevent massive memory leaks, 
      // but in standard JS we can't detect it, so we just log a lightweight string.
      const rand1 = (Math.random() * 999).toFixed(4);
      const rand2 = (Math.random() * 999).toFixed(4);
      const rand3 = (Math.random() * 999).toFixed(4);
      const rand4 = (Math.random() * 999).toFixed(4);
      const output = `[WEBGL_PIPELINE] Tensor Compute_Z Matrix4x4 [ ${rand1}, ${rand2}, ${rand3}, ${rand4} ]`;
      
      console.log("%c" + output, "color: #333333; font-family: monospace; font-size: 10px;");
    }, 2000); // Pulse every 2 seconds so it doesn't crash their browser, but keeps moving.
    // 0.0001% Detail 2: Dynamic Tab Title
    // When the user switches tabs, the site begs them to come back.
    const originalTitle = document.title || "Abhigyan Dwivedi — Designer & Developer";
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back! 🥺 — " + originalTitle;
      } else {
        document.title = originalTitle;
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    // Limit Break 1: Procedural Harmonic Symphony
    // Attach generative audio to interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a") || target.closest("button") || target.closest(".bento-card") || target.tagName === "H3";
      
      if (isInteractive) {
        import("@/utils/audioReactive").then((mod) => {
          mod.audioEngine.playGenerativeNote();
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      clearInterval(intv);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div className="film-grain" />
      <CustomCursor />
      <div className="relative z-10 w-full pointer-events-auto">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
