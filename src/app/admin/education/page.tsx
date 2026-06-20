"use client";

import { useEffect, useState } from "react";
import { databases, ID } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

interface Education {
  $id?: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export default function AdminEducation() {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // New/Edit education form state
  const [isAdding, setIsAdding] = useState(false);
  const [newEdu, setNewEdu] = useState({ degree: "", institution: "", period: "", description: "" });
  const [saving, setSaving] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Education | null>(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  async function fetchEducation() {
    setLoading(true);
    try {
      const res = await databases.listDocuments("portfolio_db", "education");
      const mapped = res.documents.map((doc: any) => ({
        $id: doc.$id,
        degree: doc.degree,
        institution: doc.institution,
        period: doc.period,
        description: doc.description
      }));
      setEducationList(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this education record?")) return;
    try {
      await databases.deleteDocument("portfolio_db", "education", id);
      setEducationList(prev => prev.filter(p => p.$id !== id));
    } catch (e) {
      alert("Failed to delete");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await databases.createDocument("portfolio_db", "education", ID.unique(), newEdu);
      setEducationList([...educationList, { ...newEdu, $id: res.$id }]);
      setIsAdding(false);
      setNewEdu({ degree: "", institution: "", period: "", description: "" });
    } catch (err) {
      alert("Failed to add education record");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (edu: Education) => {
    setEditingId(edu.$id!);
    setEditForm({ ...edu });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm || !editingId) return;
    setSaving(true);
    try {
      const { $id, ...payload } = editForm;
      await databases.updateDocument("portfolio_db", "education", editingId, payload);
      setEducationList(prev => prev.map(p => p.$id === editingId ? { ...editForm } : p));
      setEditingId(null);
      setEditForm(null);
    } catch (err) {
      alert("Failed to update education");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="text-white p-10 max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Education</h1>
          <p className="text-neutral-500 text-sm">Manage your academic history and certifications.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-accent text-black font-semibold rounded-xl px-5 py-2.5 hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
        >
          {isAdding ? "Cancel" : "+ Add Education"}
        </button>
      </div>

        {isAdding && (
          <form onSubmit={handleAdd} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Add New Education</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/80">Degree / Certification</label>
                <input required value={newEdu.degree} onChange={e => setNewEdu({...newEdu, degree: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="text-sm text-white/80">Institution</label>
                <input required value={newEdu.institution} onChange={e => setNewEdu({...newEdu, institution: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/80">Period (e.g. 2018 - 2022)</label>
              <input required value={newEdu.period} onChange={e => setNewEdu({...newEdu, period: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-sm text-white/80">Description</label>
              <textarea required value={newEdu.description} onChange={e => setNewEdu({...newEdu, description: e.target.value})} rows={3} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
            </div>
            <button type="submit" disabled={saving} className="bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-white/90 disabled:opacity-50">
              {saving ? "Saving..." : "Save Education"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-white/50">Loading...</div>
        ) : (
          <div className="space-y-4">
            {educationList.map(edu => (
              <div key={edu.$id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col justify-between items-start">
                {editingId === edu.$id && editForm ? (
                  <form onSubmit={handleUpdate} className="w-full space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-white/80">Degree</label>
                        <input required value={editForm.degree} onChange={e => setEditForm({...editForm, degree: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm" />
                      </div>
                      <div>
                        <label className="text-sm text-white/80">Institution</label>
                        <input required value={editForm.institution} onChange={e => setEditForm({...editForm, institution: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm" />
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
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-accent text-sm mb-2">{edu.institution} <span className="text-white/40">| {edu.period}</span></p>
                      <p className="text-white/70 text-sm max-w-2xl">{edu.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => startEditing(edu)} className="text-accent hover:underline text-sm font-medium">Edit</button>
                      <button onClick={() => handleDelete(edu.$id!)} className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {educationList.length === 0 && <p className="text-white/50">No education records found.</p>}
          </div>
        )}
    </div>
  );
}
