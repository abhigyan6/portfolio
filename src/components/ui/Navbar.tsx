"use client";

import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
              className="text-xs font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
              data-hover
            >
              {item.label}
            </button>
          </MagneticButton>
        ))}
      </div>
    </nav>
  );
}
