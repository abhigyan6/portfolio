"use client";

import { useRef, useState } from "react";

export default function Hero() {
  const name = "Abhigyan";
  const [displayText, setDisplayText] = useState(name.split(""));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((letter, index) => {
          if (index < iteration) {
            return name[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
      );

      if (iteration >= name.length) {
        clearInterval(intervalRef.current!);
      }
      iteration += 1 / 3; // slow down reveal
    }, 30);
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">
      <div className="text-center max-w-5xl mx-auto -mt-20"> {/* Negative margin to pull it up and reduce empty space */}
        {/* Name — massive and immediate */}
        <div className="mb-2" style={{ perspective: "1000px" }}>
          <h1 
            className="text-[15vw] sm:text-[12vw] md:text-[12rem] font-extrabold tracking-tighter leading-none pb-4 flex justify-center cursor-default"
            onMouseEnter={handleMouseEnter}
          >
            {displayText.map((char, i) => (
              <span 
                key={i} 
                className="inline-block opacity-0 text-gradient-animated" 
                style={{ 
                  transformOrigin: "0 100%",
                  animation: `cinematicReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.08}s forwards, textShimmer 4s linear infinite`
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Role */}
        <div
          className="text-lg md:text-2xl text-neutral-400 font-mono tracking-wider opacity-0"
          style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards" }}
        >
          Product Designer &bull; Frontend Engineer
        </div>

        {/* Tagline */}
        <div
          className="mt-8 max-w-2xl mx-auto opacity-0"
          style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards" }}
        >
          <p className="text-xl md:text-3xl text-neutral-200 font-medium tracking-tight">
            Engineering elegant systems. Designing visceral experiences.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 opacity-0"
          style={{ animation: "fadeIn 1s ease 2s forwards" }}
        >
          <div className="w-[1px] h-16 bg-neutral-800 mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-neutral-400 origin-top animate-scroll-down" />
          </div>
          <span className="text-xs text-neutral-400 font-mono mt-3 block">scroll</span>
        </div>
      </div>
    </section>
  );
}
