"use client";

import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";
import { audioEngine } from "@/utils/audioReactive";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Section tracking
      const sections = ["hero", "about", "projects", "contact"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section's top is in the upper half of viewport, it's active
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleAudio = () => {
    // Show warning every time audio is turned ON
    if (!audioEngine.isPlaying) {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 5000);
    }

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
          className="text-sm font-bold text-white tracking-tight flex items-center gap-1 group"
          data-hover
        >
          <span className="text-accent group-hover:-translate-x-1 transition-transform opacity-0 group-hover:opacity-100">&lt;</span>
          abhigyan
          <span className="text-accent group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100">/&gt;</span>
          <span className="text-neutral-600 group-hover:opacity-0 transition-opacity absolute right-0">.</span>
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
              className={`relative text-xs font-mono uppercase tracking-widest hidden md:block py-2 transition-colors ${
                activeSection === item.id ? "text-white" : "text-neutral-500 hover:text-neutral-300"
              }`}
              data-hover
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full animate-fadeIn" />
              )}
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

      {/* Performance Warning Toast */}
      <div 
        className={`fixed bottom-8 right-8 z-[100] px-6 py-4 bg-[#0a0a0f]/90 backdrop-blur-xl border border-[#ff3366]/30 rounded-2xl shadow-[0_10px_40px_-10px_rgba(255,51,102,0.2)] transition-all duration-500 ease-out flex items-center gap-4 max-w-sm pointer-events-none
        ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
      >
        <div className="w-2 h-2 rounded-full bg-[#ff3366] animate-pulse flex-shrink-0" />
        <p className="text-[#a1a1aa] text-xs font-medium leading-relaxed font-mono">
          <strong className="text-white">Performance Warning:</strong> Audio mode uses real-time WebGL effects. You may notice slight performance changes on some devices.
        </p>
      </div>
    </nav>
  );
}
