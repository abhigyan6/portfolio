"use client";

import ScrollReveal from "../ui/ScrollReveal";

export default function About() {
  const designSkills = ["UI/UX Design", "Figma", "Wireframing", "Design Systems", "Canva", "Spline 3D", "Blender", "Branding", "Typography", "Color Theory"];
  const devSkills = ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Responsive Design", "Accessibility"];

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
            <div className="bento-card p-8 md:p-12 h-full flex flex-col justify-center hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 transition-all duration-500">
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white leading-tight">
                Designing and building<br />
                <span className="text-gradient">digital experiences</span> that matter.
              </h3>
              <div className="text-neutral-200 space-y-4 text-base leading-relaxed font-medium">
                <p>
                  I&apos;m a Computer Science student at LNCTE College with a sharp focus on UI/UX Design, Graphic Design, and Frontend Development. My approach is rooted in design thinking — solving complex problems through intuitive, visually compelling interfaces.
                </p>
                <p>
                  I&apos;ve led UI design for the LNUniverse website, worked as a UI/UX Designer with E-Cell LNCTS, and crafted complete visual identities for startups, hackathons, and community events — from wireframes to final marketing assets.
                </p>
                <p>
                  I don&apos;t just design interfaces — I build them. With HTML, CSS, JavaScript, and React.js, I bridge the gap between design and engineering.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Experience */}
          <ScrollReveal className="md:col-span-4" delay={200}>
            <div className="bento-card p-8 h-full flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 transition-all duration-500">
              <h4 className="text-xs font-mono text-neutral-300 uppercase tracking-widest mb-8">Experience</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-white font-semibold">UI/UX Designer</p>
                  <p className="text-neutral-300 text-sm">E-Cell LNCTS</p>
                </div>
                <div>
                  <p className="text-white font-semibold">UI Designer</p>
                  <p className="text-neutral-300 text-sm">LNUniverse Website</p>
                </div>
                <div>
                  <p className="text-white font-semibold">Visual Designer</p>
                  <p className="text-neutral-300 text-sm">Event Branding & Campaigns</p>
                </div>
                <div>
                  <p className="text-white font-semibold">Community Participant</p>
                  <p className="text-neutral-300 text-sm">Google Cloud & Tech Initiatives</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Design Skills */}
          <ScrollReveal className="md:col-span-5" delay={300}>
            <div className="bento-card p-8 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 transition-all duration-500">
              <h4 className="text-xs font-mono text-neutral-300 uppercase tracking-widest mb-6">Design</h4>
              <div className="flex flex-wrap gap-2">
                {designSkills.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Dev Skills */}
          <ScrollReveal className="md:col-span-4" delay={400}>
            <div className="bento-card p-8 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 transition-all duration-500">
              <h4 className="text-xs font-mono text-neutral-300 uppercase tracking-widest mb-6">Engineering</h4>
              <div className="flex flex-wrap gap-2">
                {devSkills.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Goal */}
          <ScrollReveal className="md:col-span-3" delay={500}>
            <div className="bento-card p-8 h-full flex flex-col justify-center hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 transition-all duration-500">
              <h4 className="text-xs font-mono text-neutral-300 uppercase tracking-widest mb-4">Goal</h4>
              <p className="text-neutral-200 text-sm leading-relaxed font-medium">
                To become a Product Designer and Frontend Developer — designing and building impactful digital products from research to production.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
