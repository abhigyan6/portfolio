"use client";

import { useEffect, useState } from "react";
import { databases, ID } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

interface Experience {
  $id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // New/Edit experience form state
  const [isAdding, setIsAdding] = useState(false);
  const [newExp, setNewExp] = useState({ role: "", company: "", period: "", description: "" });
  const [saving, setSaving] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Experience | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function fetchExperiences() {
    setLoading(true);
    try {
      const res = await databases.listDocuments("portfolio_db", "experiences");
      const mapped = res.documents.map((doc: any) => ({
        $id: doc.$id,
        role: doc.role,
        company: doc.company,
        period: doc.period,
        description: doc.description
      }));
      setExperiences(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this experience?")) return;
    try {
      await databases.deleteDocument("portfolio_db", "experiences", id);
      setExperiences(prev => prev.filter(p => p.$id !== id));
    } catch (e) {
      alert("Failed to delete");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await databases.createDocument("portfolio_db", "experiences", ID.unique(), newExp);
      setExperiences([...experiences, { ...newExp, $id: res.$id }]);
      setIsAdding(false);
      setNewExp({ role: "", company: "", period: "", description: "" });
    } catch (err) {
      alert("Failed to add experience");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (exp: Experience) => {
    setEditingId(exp.$id!);
    setEditForm({ ...exp });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm || !editingId) return;
    setSaving(true);
    try {
      const { $id, ...payload } = editForm;
      await databases.updateDocument("portfolio_db", "experiences", editingId, payload);
      setExperiences(prev => prev.map(p => p.$id === editingId ? { ...editForm } : p));
      setEditingId(null);
      setEditForm(null);
    } catch (err) {
      alert("Failed to update experience");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="text-white p-10 max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Experience</h1>
          <p className="text-neutral-500 text-sm">Manage your work history and timeline.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-accent text-black font-semibold rounded-xl px-5 py-2.5 hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
        >
          {isAdding ? "Cancel" : "+ Add Experience"}
        </button>
      </div>

        {isAdding && (
          <form onSubmit={handleAdd} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Add New Role</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/80">Role Title</label>
                <input required value={newExp.role} onChange={e => setNewExp({...newExp, role: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="text-sm text-white/80">Company</label>
                <input required value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/80">Period (e.g. 2021 - 2023)</label>
              <input required value={newExp.period} onChange={e => setNewExp({...newExp, period: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-sm text-white/80">Description</label>
              <textarea required value={newExp.description} onChange={e => setNewExp({...newExp, description: e.target.value})} rows={3} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
            </div>
            <button type="submit" disabled={saving} className="bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-white/90 disabled:opacity-50">
              {saving ? "Saving..." : "Save Role"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-white/50">Loading...</div>
        ) : (
          <div className="space-y-4">
            {experiences.map(exp => (
              <div key={exp.$id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col justify-between items-start">
                {editingId === exp.$id && editForm ? (
                  <form onSubmit={handleUpdate} className="w-full space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-white/80">Role Title</label>
                        <input required value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm" />
                      </div>
                      <div>
                        <label className="text-sm text-white/80">Company</label>
                        <input required value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-white/80">Period</label>
                      <input required value={editForm.period} onChange={e => setEditForm({...editForm, period: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm text-white/80">Description</label>
                      <textarea required value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} rows={3} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm" />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" disabled={saving} className="bg-accent text-black px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-accent/90">{saving ? "Saving" : "Save"}</button>
                      <button type="button" onClick={() => setEditingId(null)} className="bg-white/10 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white/20">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="w-full flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <p className="text-accent text-sm mb-2">{exp.company} <span className="text-white/40">| {exp.period}</span></p>
                      <p className="text-white/70 text-sm max-w-2xl">{exp.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => startEditing(exp)} className="text-accent hover:underline text-sm font-medium">Edit</button>
                      <button onClick={() => handleDelete(exp.$id!)} className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {experiences.length === 0 && <p className="text-white/50">No experience records found.</p>}
          </div>
        )}
    </div>
  );
}
