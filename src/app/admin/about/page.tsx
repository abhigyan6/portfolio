"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";

export default function AdminAbout() {
  const [bio, setBio] = useState("");
  const [currentlyBuilding, setCurrentlyBuilding] = useState("");
  const [techStack, setTechStack] = useState("");
  
  const [bioDocId, setBioDocId] = useState("");
  const [cbDocId, setCbDocId] = useState("");
  const [techDocId, setTechDocId] = useState("");
  
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await databases.listDocuments("portfolio_db", "content_blocks", [
        Query.equal("key", ["about_bio", "about_currently_building", "tech_stack"])
      ]);
      res.documents.forEach(doc => {
        if (doc.key === "about_bio") {
          setBio(doc.value);
          setBioDocId(doc.$id);
        } else if (doc.key === "about_currently_building") {
          setCurrentlyBuilding(doc.value);
          setCbDocId(doc.$id);
        } else if (doc.key === "tech_stack") {
          setTechStack(JSON.parse(doc.value).join(", "));
          setTechDocId(doc.$id);
        }
      });
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (bioDocId) await databases.updateDocument("portfolio_db", "content_blocks", bioDocId, { value: bio });
      if (cbDocId) await databases.updateDocument("portfolio_db", "content_blocks", cbDocId, { value: currentlyBuilding });
      if (techDocId) {
        const stackArray = techStack.split(",").map(t => t.trim()).filter(Boolean);
        await databases.updateDocument("portfolio_db", "content_blocks", techDocId, { value: JSON.stringify(stackArray) });
      }
      alert("Saved successfully!");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="text-white p-10 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">About Text & Tech Stack</h1>
          <p className="text-neutral-500 text-sm">Update your bio and currently building status.</p>
        </div>
      </div>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Bio Text</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Currently Building (Headline)</label>
            <input
              type="text"
              value={currentlyBuilding}
              onChange={(e) => setCurrentlyBuilding(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Tech Stack (Comma separated)</label>
            <textarea
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
              rows={3}
            />
          </div>
          <button type="submit" disabled={saving} className="bg-accent text-black font-semibold rounded-xl px-6 py-3 hover:bg-accent/90 disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
    </div>
  );
}
