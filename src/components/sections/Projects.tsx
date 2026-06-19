"use client";

import ScrollReveal from "../ui/ScrollReveal";

export default function Projects() {
  const projects = [
    {
      title: "LNUniverse",
      desc: "Led the UI design for this community platform — crafting wireframes, high-fidelity screens, and a cohesive design system from scratch.",
      role: "UI Designer",
      tags: ["Figma", "Design System", "UI/UX"],
      span: "md:col-span-7 md:row-span-2",
      accent: "from-violet-900/20 to-transparent",
    },
    {
      title: "E-Cell LNCTS Branding",
      desc: "Designed complete visual identities for events — posters, social media campaigns, ID cards, banners, and promotional materials.",
      role: "Graphic & Visual Designer",
      tags: ["Canva", "Branding", "Print"],
      span: "md:col-span-5 md:row-span-1",
      accent: "from-blue-900/20 to-transparent",
    },
    {
      title: "Startup & Community Projects",
      desc: "Contributed UI/UX design to multiple startup initiatives and community-driven tech projects.",
      role: "UI/UX Designer",
      tags: ["Figma", "Wireframing", "Prototyping"],
      span: "md:col-span-5 md:row-span-1",
      accent: "from-emerald-900/20 to-transparent",
    },
    {
      title: "Frontend Portfolio & Experiments",
      desc: "Building modern, responsive, and accessible web experiences using HTML, CSS, JavaScript, and React.js.",
      role: "Frontend Developer",
      tags: ["React.js", "CSS3", "JavaScript"],
      span: "md:col-span-12 md:row-span-1",
      accent: "from-amber-900/10 to-transparent",
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
              <div className="bento-card flex flex-col p-8 group h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5 transition-all duration-500">
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
