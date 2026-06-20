"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import CameraRig from "./CameraRig";
import FloatingLogos from "./FloatingLogos";
import Starfield from "./Starfield";

import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ChromaticAberration } from "@react-three/postprocessing";

import { audioEngine } from "@/utils/audioReactive";

function DynamicEffects() {
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  
  // Memoize the Vector2 so it persists and we can mutate it directly
  const offset = useMemo(() => new THREE.Vector2(0, 0), []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY.current;
      scrollVelocity.current = delta;
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    scrollVelocity.current *= 0.9;
    
    const audioIntensity = audioEngine.getFrequencyData();
    const scrollIntensity = Math.min(Math.abs(scrollVelocity.current) * 0.00015, 0.03);
    
    // Combine physical scroll speed with audio frequency pulses
    const finalIntensity = scrollIntensity + (audioIntensity * 0.015);
    
    // Mutate the memoized Vector2. The shader reads this memory reference directly.
    offset.set(finalIntensity, finalIntensity);
  });

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
      <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.12} />
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={offset} />
    </EffectComposer>
  );
}

export default function Scene() {
  const [tier, setTier] = useState<"high" | "low">("high");

  useEffect(() => {
    // 1. Detect Mobile Devices (Instant downgrade)
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // 2. Detect Rendering Engine (Chromium is highly optimized for WebGL, others are not)
    // Chrome, Edge, Brave, Arc all use Chromium and expose window.chrome
    const isChromium = /chrome|chromium|crios|edg/i.test(navigator.userAgent);
    
    // 3. Detect Hardware Cores (Requires >= 8 cores for high tier)
    const cores = navigator.hardwareConcurrency || 4;
    const isHighEndHardware = cores >= 8;

    // 4. Safari specific check (WebKit struggles with EffectComposer)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isMobile || isSafari || !isHighEndHardware || !isChromium) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTier("low");
      console.info("[Performance Matrix] Hardware/Engine limits detected. Engaging 60fps lockdown mode.");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTier("high");
      console.info("[Performance Matrix] High-end Chromium desktop detected. Engaging God-Tier effects.");
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#050508] overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={1}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Starfield count={1500} />
          <FloatingLogos count={8} />
          <CameraRig />
          
          {/* Dynamic Render Branching: */}
          {tier === "high" && <DynamicEffects />}
        </Suspense>
      </Canvas>
    </div>
  );
}
