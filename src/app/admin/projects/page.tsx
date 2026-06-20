"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

interface Project {
  $id?: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  tags: string[];
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await databases.listDocuments("portfolio_db", "projects");
      const mapped = res.documents.map((doc: any) => ({
        $id: doc.$id,
        title: doc.title,
        description: doc.description,
        link: doc.link,
        imageUrl: doc.imageUrl,
        tags: doc.tags
      }));
      setProjects(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await databases.deleteDocument("portfolio_db", "projects", id);
      setProjects(prev => prev.filter(p => p.$id !== id));
    } catch (e) {
      alert("Failed to delete project");
    }
  };

  const startEditing = (project: Project) => {
    setEditingId(project.$id!);
    setEditForm({ ...project });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm || !editingId) return;
    setSaving(true);
    try {
      // Remove $id from payload
      const { $id, ...payload } = editForm;
      await databases.updateDocument("portfolio_db", "projects", editingId, payload);
      
      // Update local state
      setProjects(prev => prev.map(p => p.$id === editingId ? { ...editForm } : p));
      cancelEditing();
    } catch (err) {
      alert("Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="text-white p-10 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Manage Projects</h1>
          <p className="text-neutral-500 text-sm">Add, edit, or remove your portfolio projects.</p>
        </div>
        <button 
          onClick={() => router.push("/admin/projects/new")}
          className="bg-accent text-black font-semibold rounded-xl px-5 py-2.5 hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
        >
          + Add New Project
        </button>
      </div>

        {loading ? (
          <div className="text-white/50">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project.$id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col">
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover opacity-80" />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  {editingId === project.$id && editForm ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <input 
                        value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} 
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" placeholder="Title" required 
                      />
                      <textarea 
                        value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} 
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" placeholder="Description" rows={3} required 
                      />
                      <input 
                        value={editForm.imageUrl} onChange={e => setEditForm({...editForm, imageUrl: e.target.value})} 
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" placeholder="Image URL" required 
                      />
                      <input 
                        value={editForm.link} onChange={e => setEditForm({...editForm, link: e.target.value})} 
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" placeholder="Project Link" required 
                      />
                      <input 
                        value={editForm.tags.join(", ")} 
                        onChange={e => setEditForm({...editForm, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean)})} 
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" placeholder="Tags (comma separated)" 
                      />
                      <div className="flex gap-2 pt-2">
                        <button type="submit" disabled={saving} className="bg-accent text-black px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-accent/90">{saving ? "Saving" : "Save"}</button>
                        <button type="button" onClick={cancelEditing} className="bg-white/10 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white/20">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-white/60 text-sm mb-4 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                        <button onClick={() => startEditing(project)} className="text-accent hover:underline text-sm font-medium">Edit</button>
                        <button onClick={() => handleDelete(project.$id!)} className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
