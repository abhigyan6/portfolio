"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";

export default function AdminContact() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  
  const [emailDocId, setEmailDocId] = useState("");
  const [phoneDocId, setPhoneDocId] = useState("");
  const [locationDocId, setLocationDocId] = useState("");
  const [resumeDocId, setResumeDocId] = useState("");
  const [socialDocId, setSocialDocId] = useState("");
  
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await databases.listDocuments("portfolio_db", "content_blocks", [
        Query.equal("key", ["about_email", "about_phone", "about_location", "resume_url", "social_links"])
      ]);
      res.documents.forEach(doc => {
        if (doc.key === "about_email") { setEmail(doc.value); setEmailDocId(doc.$id); }
        else if (doc.key === "about_phone") { setPhone(doc.value); setPhoneDocId(doc.$id); }
        else if (doc.key === "about_location") { setLocation(doc.value); setLocationDocId(doc.$id); }
        else if (doc.key === "resume_url") { setResumeUrl(doc.value); setResumeDocId(doc.$id); }
        else if (doc.key === "social_links") { setSocialLinks(doc.value); setSocialDocId(doc.$id); }
      });
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (emailDocId) await databases.updateDocument("portfolio_db", "content_blocks", emailDocId, { value: email });
      if (phoneDocId) await databases.updateDocument("portfolio_db", "content_blocks", phoneDocId, { value: phone });
      if (locationDocId) await databases.updateDocument("portfolio_db", "content_blocks", locationDocId, { value: location });
      if (resumeDocId) await databases.updateDocument("portfolio_db", "content_blocks", resumeDocId, { value: resumeUrl });
      if (socialDocId) await databases.updateDocument("portfolio_db", "content_blocks", socialDocId, { value: socialLinks });
      
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Contact & Resume</h1>
          <p className="text-neutral-500 text-sm">Update your contact information and resume URL.</p>
        </div>
      </div>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Resume PDF URL</label>
            <p className="text-xs text-white/50 mb-2">Host your PDF on Google Drive or Appwrite Storage and paste the raw link here.</p>
            <input
              type="url"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Social Links (JSON Format)</label>
            <textarea
              value={socialLinks}
              onChange={(e) => setSocialLinks(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent font-mono text-sm"
              rows={6}
            />
          </div>

          <button type="submit" disabled={saving} className="bg-accent text-black font-semibold rounded-xl px-6 py-3 hover:bg-accent/90 disabled:opacity-50 mt-4">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
    </div>
  );
}
