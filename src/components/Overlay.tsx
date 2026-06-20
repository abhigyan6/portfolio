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
    // Friendly Easter Egg
    console.log("%cOh look, another developer inspecting my source code. 👀", "color: #ffffff; font-size: 18px; font-weight: bold; background: #000000; padding: 10px 20px; border-radius: 4px; font-family: monospace; border: 1px solid #333;");
    console.log("%cHere to copy my 60fps locked WebGL math? Go ahead, I won't tell anyone.", "color: #a0a0a0; font-size: 14px; font-family: monospace; padding-top: 10px;");
    console.log("%cIf you're going to steal it, at least hire me: abhigyanforwork@gmail.com", "color: #6366f1; font-size: 14px; font-weight: bold; font-family: monospace; padding-top: 10px;");
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
