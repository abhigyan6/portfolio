"use client";

import Link from "next/link";

const adminSections = [
  {
    title: "Hero Content",
    description: "Manage your landing page headline, roles, and tagline.",
    href: "/admin/hero",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
  },
  {
    title: "Projects",
    description: "Add or remove items from your portfolio grid.",
    href: "/admin/projects",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
  },
  {
    title: "About Text & Tech",
    description: "Update your bio, location, and tech stack.",
    href: "/admin/about",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  },
  {
    title: "Experience",
    description: "Update your work history timeline.",
    href: "/admin/experience",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  },
  {
    title: "Education",
    description: "Manage your academic history and degrees.",
    href: "/admin/education",
    icon: "M12 14l9-5-9-5-9 5 9 5z"
  },
  {
    title: "Contact Info & Resume",
    description: "Manage email, social links, and your resume URL.",
    href: "/admin/contact",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  },
  {
    title: "Music Tracks",
    description: "Upload and manage background audio tracks.",
    href: "/admin/music",
    icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
  }
];

export default function AdminDashboard() {
  return (
    <div className="text-white p-10 max-w-6xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-neutral-500 text-sm">Welcome back. Select a section below or from the sidebar to manage your portfolio content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Link 
            key={section.href} 
            href={section.href}
            className="group block p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={section.icon} />
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">{section.title}</h2>
            <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
