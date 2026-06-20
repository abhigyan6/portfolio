"use client";

import ScrollReveal from "../ui/ScrollReveal";
import TiltCard from "../ui/TiltCard";

export default function Projects() {
  const projects = [
    {
      title: "LNUniverse Architecture",
      desc: "Architected a high-performance community platform from 0 to 1. Built a comprehensive design system in Figma and translated it into pixel-perfect React components to solve complex user onboarding challenges.",
      role: "Lead UI Designer",
      tags: ["Design Systems", "Figma", "Interaction Design"],
      span: "md:col-span-8 md:row-span-1",
      accent: "from-neutral-800 to-transparent",
    },
    {
      title: "E-Cell Visual Identity",
      desc: "Designed complete visual identities for high-stakes startup events. Created strict brand guidelines that scaled across print, social campaigns, and massive 10x10ft stage banners.",
      role: "Visual Designer",
      tags: ["Branding", "Print", "Typography"],
      span: "md:col-span-4 md:row-span-1",
      accent: "from-neutral-800 to-transparent",
    },
    {
      title: "Audio-Reactive WebGL Engine",
      desc: "Engineered a custom physics engine running on React Three Fiber. Implemented an AudioContext LFO to map real-time FFT frequency data directly into the GPU shaders, creating a living, breathing 3D environment.",
      role: "Design Engineer",
      tags: ["WebGL", "Three.js", "GLSL"],
      span: "md:col-span-12 md:row-span-1",
      accent: "from-neutral-800 to-transparent",
    },
  ];

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
              <TiltCard className="bento-card flex flex-col p-8 h-full">
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${proj.accent} rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-neutral-400">{proj.role}</span>
                    <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                    {proj.title}
                  </h3>
                  <p className="text-neutral-300 text-sm mb-auto leading-relaxed max-w-lg">{proj.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
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
