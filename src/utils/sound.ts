let sharedCtx: AudioContext | null = null;
let hasInteracted = false;

if (typeof window !== "undefined") {
  const markInteracted = () => {
    hasInteracted = true;
    window.removeEventListener('mousedown', markInteracted);
    window.removeEventListener('keydown', markInteracted);
    window.removeEventListener('touchstart', markInteracted);
  };
  window.addEventListener('mousedown', markInteracted);
  window.addEventListener('keydown', markInteracted);
  window.addEventListener('touchstart', markInteracted);
}

export const playTick = () => {
  if (typeof window === "undefined" || !hasInteracted) return;
  
  try {
    if (!sharedCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      sharedCtx = new AudioContextClass();
    }
    
    // If context is still suspended (e.g. strict policies), don't force it and cause warnings
    if (sharedCtx.state === "suspended") {
      sharedCtx.resume().catch(() => {});
      if (sharedCtx.state === "suspended") return;
    }
    
    const osc = sharedCtx.createOscillator();
    const gainNode = sharedCtx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, sharedCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, sharedCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.05, sharedCtx.currentTime); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, sharedCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(sharedCtx.destination);
    
    osc.start();
    osc.stop(sharedCtx.currentTime + 0.05);
  } catch {
    // Silently fail on audio errors
  }
};
