export const playTick = () => {
  if (typeof window === "undefined") return;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    // We recreate context or keep one if possible, but browsers require interaction first
    const audioCtx = new AudioContextClass();
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Short, satisfying UI 'pop' / 'tick' sound
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // keep it subtle
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Ignore audio context errors (e.g. strict autoplay policies)
  }
};
