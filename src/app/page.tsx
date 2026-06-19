"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Overlay from "@/components/Overlay";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
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
    <main className="relative w-full min-h-screen">
      {/* Preloader — disappears after loading */}
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Custom cursor */}
      <CustomCursor />

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
