"use client";

import { useState } from "react";
import { databases, ID } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean);
      await databases.createDocument("portfolio_db", "projects", ID.unique(), {
        title,
        description,
        link,
        tags: tagsArray
      });
      alert("Project added!");
      router.push("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to add project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.push("/admin/projects")} className="mb-6 text-accent hover:underline text-sm flex items-center gap-2">
          ← Back to Projects
        </button>
        <h1 className="text-3xl font-bold mb-8">Add New Project</h1>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Link URL</label>
            <input
              required
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Tags (Comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. React, Next.js, Design"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>

          <button type="submit" disabled={saving} className="bg-accent text-black font-semibold rounded-xl px-6 py-3 hover:bg-accent/90 disabled:opacity-50">
            {saving ? "Adding..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
