class AudioReactiveEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  
  public isPlaying = false;

  public init() {
    if (typeof window === "undefined") return;
    if (this.ctx) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64; // Low resolution for smooth data
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0; // Start silent, fade in
    
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    // Setup Cinematic Ambient Drone
    this.osc1 = this.ctx.createOscillator();
    this.osc2 = this.ctx.createOscillator();
    this.lfo = this.ctx.createOscillator();
    
    const lfoGain = this.ctx.createGain();

    // Deep bass
    this.osc1.type = "sine";
    this.osc1.frequency.value = 43.65; // F1

    // Harmonically rich mid
    this.osc2.type = "triangle";
    this.osc2.frequency.value = 65.41; // C2

    // Slow pulsing LFO (creates the "breathing" audio-reactive data)
    this.lfo.type = "sine";
    this.lfo.frequency.value = 0.2; // 1 pulse every 5 seconds
    
    this.lfo.connect(lfoGain.gain);
    lfoGain.gain.value = 0.5; // Base volume
    
    this.osc1.connect(lfoGain);
    this.osc2.connect(lfoGain);
    
    lfoGain.connect(this.masterGain);

    this.osc1.start();
    this.osc2.start();
    this.lfo.start();
  }

  public toggle() {
    if (!this.ctx) this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Fade out
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 1);
      this.isPlaying = false;
    } else {
      // Fade in
      this.masterGain.gain.setTargetAtTime(0.4, this.ctx.currentTime, 2);
      this.isPlaying = true;
    }
  }

  public getFrequencyData() {
    if (!this.analyser || !this.dataArray || !this.isPlaying) {
      return 0; // Return 0 intensity if off
    }
    this.analyser.getByteFrequencyData(this.dataArray as any);
    
    // Calculate average bass/mid intensity (0 to 1)
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += this.dataArray[i];
    }
    return (sum / 10) / 255; 
  }

  // C Minor Pentatonic frequencies
  private scale = [130.81, 155.56, 174.61, 196.00, 233.08, 261.63, 311.13, 349.23, 392.00, 466.16];

  public playGenerativeNote() {
    if (!this.ctx || !this.isPlaying || !this.analyser) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Pick random note from scale
    const freq = this.scale[Math.floor(Math.random() * this.scale.length)];
    osc.frequency.value = freq;
    osc.type = "sine";

    // Procedural Envelope (Fast attack, long tail)
    noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
    noteGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.1);
    noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.0);

    osc.connect(noteGain);
    
    // Crucial: Connect to the analyser so the notes actually warp the 3D Starfield!
    noteGain.connect(this.analyser);
    noteGain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 2.0);
  }
}

export const audioEngine = new AudioReactiveEngine();
