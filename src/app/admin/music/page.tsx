"use client";

import { useEffect, useState } from "react";
import { databases, storage, ID } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

interface Track {
  $id?: string;
  name: string;
  artist: string;
  imageId: string;
  audioId: string;
}

export default function AdminMusic() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Track | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchTracks();
  }, []);

  async function fetchTracks() {
    setLoading(true);
    try {
      const res = await databases.listDocuments("portfolio_db", "audio_tracks");
      const mapped = res.documents.map((doc: any) => ({
        $id: doc.$id,
        name: doc.name,
        artist: doc.artist,
        imageId: doc.imageId,
        audioId: doc.audioId
      }));
      setTracks(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string, audioId: string, imageId: string) => {
    if (!confirm("Are you sure you want to remove this track? This will also delete the media files from storage.")) return;
    try {
      await databases.deleteDocument("portfolio_db", "audio_tracks", id);
      try { await storage.deleteFile("portfolio_media", audioId); } catch (e) {}
      try { await storage.deleteFile("portfolio_media", imageId); } catch (e) {}
      setTracks(prev => prev.filter(p => p.$id !== id));
    } catch (e) {
      alert("Failed to delete track");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFile || !imageFile) return alert("Please select both audio and image files!");
    
    setSaving(true);
    try {
      const uploadedAudio = await storage.createFile("portfolio_media", ID.unique(), audioFile);
      const uploadedImage = await storage.createFile("portfolio_media", ID.unique(), imageFile);

      const payload = {
        name,
        artist,
        audioId: uploadedAudio.$id,
        imageId: uploadedImage.$id
      };

      const res = await databases.createDocument("portfolio_db", "audio_tracks", ID.unique(), payload);
      setTracks([...tracks, { ...payload, $id: res.$id }]);
      
      setIsAdding(false);
      setName("");
      setArtist("");
      setAudioFile(null);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add track. Check console.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm || !editingId) return;
    setSaving(true);
    try {
      const { $id, ...payload } = editForm;
      await databases.updateDocument("portfolio_db", "audio_tracks", editingId, payload);
      setTracks(prev => prev.map(p => p.$id === editingId ? { ...editForm } : p));
      setEditingId(null);
      setEditForm(null);
    } catch (err) {
      alert("Failed to update track text");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="text-white p-10 max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Music Tracks</h1>
          <p className="text-neutral-500 text-sm">Upload and manage background audio tracks.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-accent text-black font-semibold rounded-xl px-5 py-2.5 hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
        >
          {isAdding ? "Cancel" : "+ Upload New Track"}
        </button>
      </div>

        {isAdding && (
          <form onSubmit={handleAdd} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Upload New Audio Track</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/80">Track Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="text-sm text-white/80">Artist</label>
                <input required value={artist} onChange={e => setArtist(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-sm text-white/80">Audio File (.mp3, .wav)</label>
                <input required type="file" accept="audio/*" onChange={e => setAudioFile(e.target.files?.[0] || null)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-white/10 file:text-white" />
              </div>
              <div>
                <label className="text-sm text-white/80">Cover Image (.jpg, .png)</label>
                <input required type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-white/10 file:text-white" />
              </div>
            </div>
            <button type="submit" disabled={saving || !audioFile || !imageFile} className="bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-white/90 disabled:opacity-50 mt-4">
              {saving ? "Uploading..." : "Upload Track & Save"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-white/50">Loading tracks...</div>
        ) : (
          <div className="space-y-4">
            {tracks.map(track => (
              <div key={track.$id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col justify-between items-start">
                {editingId === track.$id && editForm ? (
                  <form onSubmit={handleUpdate} className="w-full space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-white/80">Track Name</label>
                        <input required value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm" />
                      </div>
                      <div>
                        <label className="text-sm text-white/80">Artist</label>
                        <input required value={editForm.artist} onChange={e => setEditForm({...editForm, artist: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm" />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button type="submit" disabled={saving} className="bg-accent text-black px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-accent/90">{saving ? "Saving" : "Save Text"}</button>
                      <button type="button" onClick={() => setEditingId(null)} className="bg-white/10 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white/20">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="w-full flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{track.name}</h3>
                      <p className="text-white/60 text-sm mb-2">By {track.artist}</p>
                      <p className="text-xs text-white/30 font-mono">Audio ID: {track.audioId}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => { setEditingId(track.$id!); setEditForm({...track}); }} className="text-accent hover:underline text-sm font-medium">Edit Text</button>
                      <button onClick={() => handleDelete(track.$id!, track.audioId, track.imageId)} className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {tracks.length === 0 && <p className="text-white/50">No music tracks found.</p>}
          </div>
        )}
    </div>
  );
}
