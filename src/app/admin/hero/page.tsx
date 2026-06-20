"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";

export default function AdminHero() {
  const [tagline, setTagline] = useState("");
  const [roles, setRoles] = useState("");
  const [taglineDocId, setTaglineDocId] = useState("");
  const [rolesDocId, setRolesDocId] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await databases.listDocuments("portfolio_db", "content_blocks", [
        Query.equal("key", ["hero_tagline", "hero_roles"])
      ]);
      res.documents.forEach(doc => {
        if (doc.key === "hero_tagline") {
          setTagline(doc.value);
          setTaglineDocId(doc.$id);
        } else if (doc.key === "hero_roles") {
          setRoles(JSON.parse(doc.value).join(", "));
          setRolesDocId(doc.$id);
        }
      });
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (taglineDocId) {
        await databases.updateDocument("portfolio_db", "content_blocks", taglineDocId, { value: tagline });
      }
      if (rolesDocId) {
        const rolesArray = roles.split(",").map(r => r.trim()).filter(Boolean);
        await databases.updateDocument("portfolio_db", "content_blocks", rolesDocId, { value: JSON.stringify(rolesArray) });
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Hero Content</h1>
          <p className="text-neutral-500 text-sm">Manage the landing page headline, roles, and tagline.</p>
        </div>
      </div>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Tagline</label>
            <textarea
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Roles (Comma separated)</label>
            <input
              type="text"
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>
          <button type="submit" disabled={saving} className="bg-accent text-black font-semibold rounded-xl px-6 py-3 hover:bg-accent/90 disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
    </div>
  );
}
