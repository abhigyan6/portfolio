"use client";

import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";
import { audioEngine } from "@/utils/audioReactive";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleAudio = () => {
    audioEngine.toggle();
    setAudioPlaying(audioEngine.isPlaying);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-[#050508]/80 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <MagneticButton strength={15}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-bold text-white tracking-tight"
          data-hover
        >
          abhigyan<span className="text-neutral-600">.</span>
        </button>
      </MagneticButton>

      <div className="flex items-center gap-8">
        {[
          { label: "About", id: "about" },
          { label: "Work", id: "projects" },
          { label: "Contact", id: "contact" },
        ].map((item) => (
          <MagneticButton key={item.id} strength={10}>
            <button
              onClick={() => scrollTo(item.id)}
              className="text-xs font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest hidden md:block"
              data-hover
            >
              {item.label}
            </button>
          </MagneticButton>
        ))}

        {/* Audio Toggle */}
        <MagneticButton strength={10}>
          <button
            onClick={toggleAudio}
            className="text-xs font-mono px-3 py-1 rounded-full border border-neutral-700 hover:border-neutral-400 text-neutral-400 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2"
            data-hover
          >
            <div className="w-2 h-2 rounded-full flex items-center justify-center">
              <div className={`w-full h-full rounded-full transition-colors ${audioPlaying ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" : "bg-neutral-600"}`} />
            </div>
            Audio
          </button>
        </MagneticButton>
      </div>
    </nav>
  );
}
