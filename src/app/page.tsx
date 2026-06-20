"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Overlay from "@/components/Overlay";
import Preloader from "@/components/ui/Preloader";
import SpotlightGlow from "@/components/ui/SpotlightGlow";
import SmoothScroll from "@/components/ui/SmoothScroll";

// Dynamically import the 3D Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <main className="relative w-full min-h-screen hide-cursor">
      {/* Preloader — disappears after loading */}
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Mouse Spotlight */}
      <SpotlightGlow />

      {/* Smooth scroll wrapper */}
      <SmoothScroll>
        {/* 3D Background — fixed behind everything */}
        <Scene />

        {/* HTML Content */}
        <Overlay />
      </SmoothScroll>
    </main>
  );
}
