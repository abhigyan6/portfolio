"use client";

import MagneticButton from "../ui/MagneticButton";
import ScrollReveal from "../ui/ScrollReveal";

export default function Contact() {
  return (
    <section className="min-h-screen w-full py-32 flex flex-col items-center justify-center relative z-10 px-6" id="contact">
      <div className="max-w-4xl w-full text-center">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className="text-sm font-mono text-neutral-400">03</span>
            <div className="h-[1px] w-12 bg-neutral-600" />
            <h2 className="text-sm font-mono text-neutral-300 uppercase tracking-widest">Contact</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-4 text-accent text-sm font-mono tracking-widest uppercase">
            Based in India &bull; IST +5:30
          </div>
          <h3 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Let&apos;s build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500 bg-[length:200%_auto] animate-pulse">
              something great.
            </span>
          </h3>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-neutral-300 mb-16 text-lg max-w-lg mx-auto font-medium">
            Currently open for internships, collaborations, and opportunities in UI/UX design and frontend development.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticButton strength={30}>
              <a
                href="mailto:abhigyanforwork@gmail.com"
                className="relative inline-block px-10 py-5 rounded-full bg-white text-black font-semibold text-base hover:bg-neutral-200 transition-colors group overflow-hidden"
                data-hover
              >
                {/* Micro-interaction hover burst */}
                <span className="absolute inset-0 bg-accent/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                <span className="relative z-10 flex items-center gap-2">
                  Send an Email <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </a>
            </MagneticButton>

            <MagneticButton strength={20}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 rounded-full border border-neutral-700 hover:border-accent hover:text-accent transition-colors font-mono text-neutral-300 text-sm"
                data-hover
              >
                Resume
              </a>
            </MagneticButton>

            <MagneticButton strength={20}>
              <a
                href="https://github.com/abhigyan6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 rounded-full border border-neutral-700 hover:border-white transition-colors font-mono text-neutral-300 text-sm"
                data-hover
              >
                GitHub
              </a>
            </MagneticButton>

            <MagneticButton strength={20}>
              <a
                href="https://linkedin.com/in/abhigyan-dwivedi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 rounded-full border border-neutral-700 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors font-mono text-neutral-300 text-sm"
                data-hover
              >
                LinkedIn
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay={400}>
          <div className="mt-32 pt-8 border-t border-neutral-800">
            <p className="text-xs text-neutral-500 font-mono">
              &copy; {new Date().getFullYear()} Abhigyan Dwivedi. Designed & built with passion.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
