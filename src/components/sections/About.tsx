"use client";

import ScrollReveal from "../ui/ScrollReveal";
import TiltCard from "../ui/TiltCard";

export default function About() {
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
            <TiltCard className="bento-card p-8 md:p-12 h-full flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white leading-tight tracking-tight">
                Bridging the gap between<br />
                <span className="text-gradient">relentless design</span> and rigorous engineering.
              </h3>
              <div className="text-neutral-300 space-y-6 text-lg leading-relaxed font-medium">
                <p>
                  I don&apos;t just design interfaces in Figma; I build the physics, interactions, and production-ready code that brings them to life.
                </p>
                <p>
                  Specializing in 0-to-1 product design and creative frontend architecture, I transform complex technical requirements into tactile, high-performance digital experiences.
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
                <div>
                  <p className="text-white font-semibold tracking-tight">UI/UX Designer</p>
                  <p className="text-neutral-400 text-sm">E-Cell LNCTS</p>
                </div>
                <div>
                  <p className="text-white font-semibold tracking-tight">Lead UI Designer</p>
                  <p className="text-neutral-400 text-sm">LNUniverse Platform</p>
                </div>
                <div>
                  <p className="text-white font-semibold tracking-tight">Visual Designer</p>
                  <p className="text-neutral-400 text-sm">Event Branding & Campaigns</p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Design Skills */}
          <ScrollReveal className="md:col-span-5" delay={300}>
            <TiltCard className="bento-card p-8 h-full">
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6">Design</h4>
              <div className="flex flex-wrap gap-2">
                {designSkills.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Dev Skills */}
          <ScrollReveal className="md:col-span-4" delay={400}>
            <TiltCard className="bento-card p-8 h-full">
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6">Engineering</h4>
              <div className="flex flex-wrap gap-2">
                {devSkills.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Goal */}
          <ScrollReveal className="md:col-span-3" delay={500}>
            <TiltCard className="bento-card p-8 h-full flex flex-col justify-center">
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">Current Focus</h4>
              <p className="text-neutral-200 text-sm leading-relaxed font-medium">
                Architecting high-performance React applications, exploring WebGL physics, and pushing the boundaries of interaction design.
              </p>
            </TiltCard>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
