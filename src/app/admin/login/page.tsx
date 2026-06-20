"use client";

import { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const playAccessDeniedSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const playBuzz = (startTime: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, startTime); // Low, harsh frequency
      osc.frequency.exponentialRampToValueAtTime(80, startTime + 0.2);

      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    };

    // Play double buzz: "EH-EH"
    playBuzz(ctx.currentTime);
    playBuzz(ctx.currentTime + 0.25);

  } catch (e) {
    console.error("Audio API not supported");
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  
  const [step, setStep] = useState<"email" | "otp">("email");
  const [userId, setUserId] = useState("");
  const [isFakeHacker, setIsFakeHacker] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { checkSession } = useAuth();
  const router = useRouter();

  const triggerAccessDenied = () => {
    setIsDenied(true);
    playAccessDeniedSound();
    // Reset after 3 seconds
    setTimeout(() => {
      setIsDenied(false);
      setStep("email");
      setEmail("");
      setOtp("");
      setError("");
    }, 3000);
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (email.toLowerCase() === "darpit336@gmail.com") {
        const sessionToken = await account.createEmailToken(ID.unique(), email);
        setUserId(sessionToken.userId);
        setIsFakeHacker(false);
        setStep("otp");
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        setIsFakeHacker(true);
        setStep("otp");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isFakeHacker) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        triggerAccessDenied();
      } else {
        await account.createSession(userId, otp);
        await checkSession();
        router.push("/admin");
      }
    } catch (err: any) {
      triggerAccessDenied();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden px-4 transition-colors duration-300 ${isDenied ? 'bg-red-950' : 'bg-[#050508]'}`}>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(180,247,76,0.05)_0%,transparent_50%)]" />
      
      {/* Red screen flash for access denied */}
      {isDenied && (
        <div className="absolute inset-0 z-20 bg-red-600/20 animate-pulse pointer-events-none mix-blend-overlay" />
      )}
      
      <div className={`w-full max-w-md bg-white/5 backdrop-blur-xl border rounded-2xl p-8 z-10 transition-all duration-300 ${
        isDenied 
          ? "border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)] scale-105" 
          : "border-white/10"
      }`}>
        
        {isDenied ? (
          <div className="h-48 flex flex-col items-center justify-center text-center animate-[shake_0.5s_ease-in-out_infinite]">
            <svg className="w-16 h-16 text-red-500 mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-3xl font-bold text-red-500 tracking-[0.2em] font-mono">ACCESS DENIED</h1>
            <p className="text-red-400/80 mt-2 font-mono text-sm uppercase">Unauthorized Intrusion Detected</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
              <p className="text-white/60">
                {step === "email" ? "Enter your email for a One-Time Password." : "Check your inbox for the 6-digit code."}
              </p>
            </div>

            {step === "email" ? (
              <form onSubmit={handleRequestOtp} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm leading-relaxed">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="admin@abhigyandwivedi.me"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent text-black font-semibold rounded-xl py-3 hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending OTP..." : "Send Login Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">6-Digit Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors tracking-widest text-center text-lg font-mono"
                    placeholder="123456"
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent text-black font-semibold rounded-xl py-3 hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </button>
                
                <div className="text-center">
                  <button 
                    type="button" 
                    onClick={() => setStep("email")}
                    className="text-xs text-white/40 hover:text-white"
                  >
                    ← Back to email
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
      
      {/* Add shake animation to global tailwind scope via style block */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}} />
    </div>
  );
}
