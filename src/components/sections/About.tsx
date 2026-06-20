"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getAudioStreamUrl, getImagePreviewUrl } from "@/lib/appwrite";
import ScrollReveal from "../ui/ScrollReveal";
import TiltCard from "../ui/TiltCard";

const TRACKS = [
  {
    name: "Life Goes On",
    artist: "Oliver Tree",
    img: getImagePreviewUrl("6a36a2277eb15ba6b8c1"),
    src: getAudioStreamUrl("6a369db26e493e0b0968")
  },
  {
    name: "Putt Jatt Da",
    artist: "Diljit Dosanjh",
    img: getImagePreviewUrl("6a36a2284a7fe2ac1185"),
    src: getAudioStreamUrl("6a369db09ce766e9b2d6")
  },
  {
    name: "goosebumps",
    artist: "Travis Scott",
    img: getImagePreviewUrl("6a36a228b31a70657823"),
    src: getAudioStreamUrl("6a369db3e2c03fe8a652")
  },
  {
    name: "Feel Good Inc.",
    artist: "Gorillaz",
    img: getImagePreviewUrl("6a36a2292c4fd6f0c6c7"),
    src: getAudioStreamUrl("6a369db55c648d166199")
  },
  {
    name: "Little Dark Age",
    artist: "MGMT",
    img: getImagePreviewUrl("6a36a22992e84387bc33"),
    src: getAudioStreamUrl("6a369db7169948d9f8be")
  },
  {
    name: "Just Keep Watching",
    artist: "Tate McRae",
    img: getImagePreviewUrl("6a36a22a08864e40e1e1"),
    src: getAudioStreamUrl("6a369db80aba8c693915")
  }
];

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [randomIdx, setRandomIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Pick random track on client mount to avoid SSR hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRandomIdx(Math.floor(Math.random() * TRACKS.length));
    setMounted(true);
  }, []);

  const currentTrack = mounted ? TRACKS[randomIdx] : TRACKS[0];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const designSkills = ["Product Design", "Design Systems", "Interaction Design", "Figma", "Spline 3D", "Prototyping", "User Research"];
  const devSkills = ["React", "Next.js", "TypeScript", "Three.js", "WebGL", "Tailwind CSS", "Framer Motion"];

  return (
    <section className="min-h-screen w-full py-32 flex flex-col items-center relative z-10 px-6" id="about">
      <div className="max-w-6xl w-full">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-sm font-mono text-neutral-400">01</span>
            <div className="h-[1px] w-12 bg-neutral-600" />
            <h2 className="text-sm font-mono text-neutral-300 uppercase tracking-widest">About</h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

          {/* Main Bio */}
          <ScrollReveal className="md:col-span-8" delay={100}>
            <TiltCard className="bento-card border-accent p-8 md:p-12 h-full flex flex-col justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-muted)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-inherit pointer-events-none" />
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white leading-tight tracking-tight">
                Bridging the gap between<br />
                <span className="text-gradient">beautiful design</span> and seamless engineering.
              </h3>
              <div className="text-neutral-300 space-y-6 text-lg leading-relaxed font-medium">
                <p>
                  I love designing interfaces in Figma and bringing them to life with smooth interactions and clean, production-ready code.
                </p>
                <p>
                  Specializing in product design and frontend development, I focus on turning complex ideas into intuitive and engaging digital experiences.
                </p>
                <p>
                  Currently seeking Product Design and Frontend Internships for 2026. Let&apos;s build something extraordinary.
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Experience */}
          <ScrollReveal className="md:col-span-4" delay={200}>
            <TiltCard className="bento-card p-8 h-full flex flex-col justify-between">
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-8">Selected Experience</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-start group">
                  <div>
                    <p className="text-white font-semibold tracking-tight group-hover:text-accent transition-colors">UI/UX Designer</p>
                    <p className="text-neutral-400 text-sm">E-Cell LNCTS</p>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 mt-1">2023 — 24</span>
                </div>
                <div className="flex justify-between items-start group">
                  <div>
                    <p className="text-white font-semibold tracking-tight group-hover:text-accent transition-colors">Lead UI Designer</p>
                    <p className="text-neutral-400 text-sm">LNUniverse Platform</p>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 mt-1">2023</span>
                </div>
                <div className="flex justify-between items-start group">
                  <div>
                    <p className="text-white font-semibold tracking-tight group-hover:text-accent transition-colors">Visual Designer</p>
                    <p className="text-neutral-400 text-sm">Event Branding & Campaigns</p>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 mt-1">2022 — 23</span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Design Skills */}
          <ScrollReveal className="md:col-span-5" delay={300}>
            <TiltCard className="bento-card p-8 h-full">
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6">Design</h4>
              <div className="flex flex-wrap gap-2">
                {designSkills.map((s, i) => (
                  <span key={s} className="tag hover:border-accent hover:text-white transition-all flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ backgroundColor: `hsl(${(i * 50) % 360}, 70%, 60%)` }} />
                    {s}
                  </span>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Dev Skills */}
          <ScrollReveal className="md:col-span-4" delay={400}>
            <TiltCard className="bento-card p-8 h-full">
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6">Engineering</h4>
              <div className="flex flex-wrap gap-2">
                {devSkills.map((s, i) => (
                  <span key={s} className="tag hover:border-accent hover:text-white transition-all flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ backgroundColor: `hsl(${(i * 50 + 180) % 360}, 70%, 60%)` }} />
                    {s}
                  </span>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Goal */}
          <ScrollReveal className="md:col-span-4" delay={500}>
            <TiltCard className="bento-card p-8 h-full flex flex-col justify-center">
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">Current Focus</h4>
              <p className="text-neutral-200 text-sm leading-relaxed font-medium">
                Architecting high-performance React applications, exploring WebGL physics, and pushing the boundaries of interaction design.
              </p>
            </TiltCard>
          </ScrollReveal>

          {/* Personality Card */}
          <ScrollReveal className="md:col-span-3" delay={600}>
            <TiltCard className="bento-card p-6 h-full flex flex-col justify-between group overflow-hidden">
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-neutral-600'}`} />
                Listening To
              </h4>
              <div className="flex items-center gap-4 relative z-10">
                <div 
                  className="w-12 h-12 rounded-md bg-neutral-800 overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent to-purple-500 opacity-80 mix-blend-overlay z-10" />
                  {currentTrack.img && (
                    <Image 
                      src={currentTrack.img} 
                      alt="Album Art" 
                      fill 
                      className="object-cover"
                      sizes="48px"
                    />
                  )}
                  
                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPlaying ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white truncate max-w-[120px]" title={currentTrack.name}>{currentTrack.name}</p>
                  <p className="text-xs text-neutral-400 truncate max-w-[120px]" title={currentTrack.artist}>{currentTrack.artist}</p>
                </div>
              </div>
              {/* Spotify style audio bars */}
              <div className="absolute bottom-6 right-6 flex items-end gap-1 h-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-t-sm transition-all duration-300 ${isPlaying ? 'bg-green-500' : 'bg-neutral-700 h-1'}`} 
                    style={isPlaying ? { height: `${20 + (i * 20)}%`, animation: `pulse ${0.5 + (i * 0.2)}s infinite alternate` } : {}} 
                  />
                ))}
              </div>
              
              {/* Hidden Audio Element */}
              <audio 
                ref={audioRef} 
                src={currentTrack.src} 
                loop 
                onEnded={() => setIsPlaying(false)}
              />
            </TiltCard>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
