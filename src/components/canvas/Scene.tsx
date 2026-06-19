"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import CameraRig from "./CameraRig";
import AmbientParticles from "./AmbientParticles";
import FloatingLogos from "./FloatingLogos";
import WarpLines from "./WarpLines";

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#050508"]} />

        <Suspense fallback={null}>
          {/* Stars field */}
          <Stars
            radius={80}
            depth={60}
            count={4000}
            factor={3}
            saturation={0}
            fade
            speed={0.8}
          />

          {/* Dust particles */}
          <AmbientParticles count={1200} />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-15, -10, -15]} intensity={4} color="#7c3aed" distance={60} />
          <pointLight position={[15, 10, -15]} intensity={3} color="#2563eb" distance={60} />

          {/* Hyperspace lines on fast scroll */}
          <WarpLines />

          {/* Floating tool/software logo badges */}
          <FloatingLogos count={22} />

          {/* Camera scroll controller */}
          <CameraRig />

          {/* Environment for metallic reflections */}
          <Environment preset="night" />

          {/* Post processing — kept subtle and reliable */}
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              intensity={0.6}
              mipmapBlur
            />
            <Noise
              premultiply
              blendFunction={BlendFunction.SCREEN}
              opacity={0.12}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
