"use client";

import ScrollReveal from "../ui/ScrollReveal";
import TiltCard from "../ui/TiltCard";
import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";

interface Project {
  title: string;
  description: string;
  role: string;
  tags: string[];
  link: string;
  span?: string;
  accent?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await databases.listDocuments("portfolio_db", "projects");
        
        // Map database fields, applying static UI specific properties like span and accent
        const mappedProjects = response.documents.map((doc, idx) => ({
          title: doc.title,
          description: doc.description,
          role: doc.role || "Designer/Developer",
          tags: doc.tags || [],
          link: doc.link,
          span: idx === 0 ? "md:col-span-8 md:row-span-1" : idx === 1 ? "md:col-span-4 md:row-span-1" : "md:col-span-12 md:row-span-1",
          accent: idx === 0 ? "from-[var(--color-accent-muted)] to-transparent" : idx === 1 ? "from-purple-500/10 to-transparent" : "from-teal-500/10 to-transparent",
        }));
        
        setProjects(mappedProjects);
      } catch (e) {
        console.error("Failed to load projects", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen w-full py-32 flex flex-col items-center relative z-10 px-6" id="projects">
      <div className="max-w-6xl w-full">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-sm font-mono text-neutral-400">02</span>
            <div className="h-[1px] w-12 bg-neutral-600" />
            <h2 className="text-sm font-mono text-neutral-300 uppercase tracking-widest">Selected Work</h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(250px,auto)] gap-5">
          {projects.map((proj, idx) => (
            <ScrollReveal key={idx} className={proj.span} delay={idx * 120}>
              <TiltCard className="bento-card flex flex-col p-8 h-full group overflow-hidden cursor-pointer" key={idx}>
                <a href={proj.link} className="absolute inset-0 z-20" aria-label={`View ${proj.title}`} />
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${proj.accent} rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                {/* Background Watermark Number */}
                <div className="absolute -bottom-4 -right-4 text-[12rem] font-bold font-mono text-white/[0.02] pointer-events-none leading-none select-none transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4">
                  0{idx + 1}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-accent">{proj.role}</span>
                    <a href={proj.link} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                    </a>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
                    {proj.title}
                  </h3>
                  <p className="text-neutral-300 text-sm mb-auto leading-relaxed max-w-lg relative z-10">{proj.description}</p>

                  <div className="flex flex-wrap gap-2 mt-12 transition-transform duration-500 group-hover:-translate-y-8">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="tag bg-black/20 backdrop-blur-md">{tag}</span>
                    ))}
                  </div>

                  {/* Hover CTA Slide-up */}
                  <div className="absolute bottom-8 left-8 right-8 flex items-center gap-2 text-accent font-medium text-sm translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    View Case Study <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
