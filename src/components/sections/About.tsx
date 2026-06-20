"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getAudioStreamUrl, getImagePreviewUrl, databases } from "@/lib/appwrite";
import ScrollReveal from "../ui/ScrollReveal";
import TiltCard from "../ui/TiltCard";

interface Track {
  name: string;
  artist: string;
  img: string;
  src: string;
}

interface Experience {
  $id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  $id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export default function About() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educationList, setEducationList] = useState<Education[]>([]);
  
  // Content Blocks
  const [bio, setBio] = useState("Hey, I'm Abhigyan, a multi-disciplinary designer and developer...");
  const [currentlyBuilding, setCurrentlyBuilding] = useState("Next-Gen Web Experiences");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [randomIdx, setRandomIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // 1. Fetch Audio Tracks
        const resTracks = await databases.listDocuments("portfolio_db", "audio_tracks");
        const loadedTracks = resTracks.documents.map(doc => ({
          name: doc.name,
          artist: doc.artist,
          img: getImagePreviewUrl(doc.imageId),
          src: getAudioStreamUrl(doc.audioId)
        }));
        setTracks(loadedTracks);
        if (loadedTracks.length > 0) {
          setRandomIdx(Math.floor(Math.random() * loadedTracks.length));
        }

        // 2. Fetch Experiences
        const resExp = await databases.listDocuments("portfolio_db", "experiences");
        setExperiences(resExp.documents as any);

        // 3. Fetch Education
        const resEdu = await databases.listDocuments("portfolio_db", "education");
        setEducationList(resEdu.documents as any);

        // 4. Fetch Content Blocks
        const resBlocks = await databases.listDocuments("portfolio_db", "content_blocks");
        resBlocks.documents.forEach(doc => {
          if (doc.key === "about_bio") setBio(doc.value);
          else if (doc.key === "about_currently_building") setCurrentlyBuilding(doc.value);
          else if (doc.key === "about_email") setEmail(doc.value);
          else if (doc.key === "about_phone") setPhone(doc.value);
          else if (doc.key === "about_location") setLocation(doc.value);
          else if (doc.key === "tech_stack") setTechStack(JSON.parse(doc.value));
        });

        setMounted(true);
      } catch (e) {
        console.error("Failed to load about data", e);
      }
    }
    loadData();
  }, []);

  const currentTrack = mounted && tracks.length > 0 ? tracks[randomIdx] : null;

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
          <div className="bento-card md:col-span-4">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={exp.$id || i} className="relative pl-6 border-l border-white/10">
                  <div className="absolute w-3 h-3 bg-accent rounded-full -left-[6.5px] top-1.5 ring-4 ring-[#050508]" />
                  <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                  <p className="text-sm text-accent mb-2">{exp.company} <span className="text-neutral-500">| {exp.period}</span></p>
                  <p className="text-sm text-neutral-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bento-card md:col-span-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              Education
            </h3>
            <div className="space-y-6">
              {educationList.map((edu, i) => (
                <div key={edu.$id || i} className="relative pl-6 border-l border-white/10">
                  <div className="absolute w-3 h-3 bg-neutral-600 rounded-full -left-[6.5px] top-1.5 ring-4 ring-[#050508]" />
                  <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                  <p className="text-sm text-neutral-300 mb-2">{edu.institution} <span className="text-neutral-500">| {edu.period}</span></p>
                  <p className="text-sm text-neutral-400">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bento-card md:col-span-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.length > 0 ? techStack.map((tech, i) => (
                <span key={i} className="tag bg-white/5 border border-white/10 text-white/80 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              )) : (
                <span className="text-neutral-500 text-sm">Loading tech stack...</span>
              )}
            </div>
          </div>

          {/* Bio/Info */}
          <div className="bento-card md:col-span-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 text-white">About Me</h3>
            <p className="text-neutral-400 leading-relaxed text-lg mb-6">
              {bio}
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-neutral-300">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {location}
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {email}
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {phone}
              </div>
            </div>
          </div>

          {/* Personality Card */}
          <ScrollReveal className="md:col-span-4" delay={600}>
            <TiltCard className="bento-card p-6 h-full flex flex-col justify-between group overflow-hidden">
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-neutral-600'}`} />
                Listening To
              </h4>
              {currentTrack ? (
                <>
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
                </>
              ) : (
                <div className="text-neutral-500 text-sm animate-pulse">Loading tracks...</div>
              )}
            </TiltCard>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
