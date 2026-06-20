"use client";

import { useRef, useState, useEffect } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";

export default function Hero() {
  const name = "Abhigyan";
  const [roles, setRoles] = useState(["Product Designer", "Frontend Developer", "Creative Engineer"]);
  const [tagline, setTagline] = useState("Building elegant systems. Designing beautiful experiences.");
  const [resumeUrl, setResumeUrl] = useState("#");
  const [displayText, setDisplayText] = useState(name.split(""));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await databases.listDocuments("portfolio_db", "content_blocks", [
          Query.equal("key", ["hero_roles", "hero_tagline", "resume_url"])
        ]);
        
        response.documents.forEach((doc) => {
          if (doc.key === "hero_roles") {
            setRoles(JSON.parse(doc.value));
          } else if (doc.key === "hero_tagline") {
            setTagline(doc.value);
          } else if (doc.key === "resume_url") {
            setResumeUrl(doc.value);
          }
        });
      } catch (e) {
        console.error("Failed to load hero content", e);
      }
    }
    fetchContent();
  }, []);

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

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (roles.length === 0) return;
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(roleInterval);
  }, [roles]);

  return (
    <section id="hero" className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden pt-20">
      <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Availability Badge */}
        <div 
          className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md opacity-0"
          style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards" }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-green-400 font-medium">Open to opportunities</span>
        </div>
        {/* Name — massive and immediate */}
        <div className="mb-2" style={{ perspective: "1000px" }}>
          <h1 
            className="text-[11vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] xl:text-[11rem] font-extrabold tracking-tighter leading-none pb-4 flex justify-center cursor-default"
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

        {/* Role (Dynamic Typewriter style) */}
        <div
          className="text-lg md:text-2xl text-neutral-400 font-mono tracking-wider opacity-0 h-8 flex justify-center items-center overflow-hidden"
          style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards" }}
        >
          <div className="relative">
            {roles.map((role, idx) => (
              <div
                key={role}
                className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-500 ease-in-out"
                style={{
                  opacity: roleIndex === idx ? 1 : 0,
                  transform: `translate(-50%, ${roleIndex === idx ? '0' : roleIndex > idx ? '-100%' : '100%'})`
                }}
              >
                {role}
              </div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div
          className="mt-8 max-w-2xl mx-auto opacity-0"
          style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards" }}
        >
          <p className="text-xl md:text-3xl text-neutral-200 font-medium tracking-tight mb-8">
            {tagline}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto relative z-20">
            <a 
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform text-center"
            >
              View Work
            </a>
            <a 
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group"
            >
              Resume
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator & Socials */}
        <div
          className="mt-16 opacity-0 flex flex-col items-center gap-8"
          style={{ animation: "fadeIn 1s ease 2s forwards" }}
        >
          <div className="w-[1px] h-16 bg-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-neutral-400 origin-top animate-scroll-down" />
          </div>
          
          <div className="flex gap-6 text-neutral-500">
            <a href="https://github.com/abhigyan6" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/abhigyan-dwivedi" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:abhigyanforwork@gmail.com" className="hover:text-accent transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
