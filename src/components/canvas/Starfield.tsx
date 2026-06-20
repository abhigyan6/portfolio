"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { audioEngine } from "@/utils/audioReactive";

export default function Starfield({ count = 1500 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Store initial random positions and base speeds
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [positions, setPositions] = useState<any[]>([]);

  useEffect(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 80,
        z: (Math.random() - 0.5) * 100,
        baseSpeed: Math.random() * 0.05 + 0.02,
        warpSpeed: Math.random() * 0.5 + 0.5,
      });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPositions(pos);
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(1, 1, 0.1); // Small dots by default
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, positions]);

  // Track scroll velocity
  const scrollRef = useRef(0);
  const velocityRef = useRef(0);

  // Track mouse position for parallax
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - scrollRef.current;
      velocityRef.current = delta;
      scrollRef.current = current;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    
    scrollRef.current = window.scrollY;
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current || !groupRef.current) return;

    // Get live audio intensity (0 to 1)
    const audioIntensity = audioEngine.getFrequencyData();

    // Smooth mouse parallax
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
    
    groupRef.current.rotation.x = mouseRef.current.y * 0.1;
    groupRef.current.rotation.y = mouseRef.current.x * 0.1;

    // Decay scroll velocity smoothly
    velocityRef.current *= 0.92;
    const absVel = Math.abs(velocityRef.current);
    
    // Calculate warp intensity based on scroll velocity
    const triggerThreshold = 15;
    const activeVel = Math.max(0, absVel - triggerThreshold);
    
    // Base scale is 0.1 (dots). Warp scale maxes out around 80.
    // ADD Audio Intensity to stretch stars during bass hits
    const targetScaleZ = Math.min(activeVel * 1.5 + (audioIntensity * 15) + 0.1, 80);
    // Base opacity is 0.4. Warp opacity ramps up to 0.9.
    const targetOpacity = Math.min(activeVel * 0.015 + (audioIntensity * 0.5) + 0.4, 0.9);
    
    materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.1;
    
    // Ambient base rotation + AUDIO pulsing rotation
    groupRef.current.rotation.z += (delta * 0.02) + (audioIntensity * 0.02);

    positions.forEach((p, i) => {
      // Ambient vertical drift
      p.y += delta * 0.5 * p.baseSpeed;
      
      // Warp speed Z-axis movement + AUDIO propulsion
      const audioThrust = audioIntensity > 0.1 ? audioIntensity * 2 : 0;
      
      if (activeVel > 0 || audioThrust > 0) {
        const dir = velocityRef.current >= 0 ? 1 : -1;
        p.z += p.warpSpeed * (activeVel * 0.2 + audioThrust) * dir;
      }
      
      // Wrap around bounds (Ambient Y)
      if (p.y > 40) p.y -= 80;
      if (p.y < -40) p.y += 80;

      // Wrap around bounds (Warp Z)
      if (p.z > 50) p.z -= 100;
      if (p.z < -50) p.z += 100;

      dummy.position.set(p.x, p.y, p.z);
      // Dynamically stretch Z axis for hyperspace
      dummy.scale.set(0.6 + (audioIntensity * 0.5), 0.6 + (audioIntensity * 0.5), targetScaleZ);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.04, 0.04, 1]} />
        <meshBasicMaterial 
          ref={materialRef} 
          color="#ffffff" 
          transparent 
          opacity={0.4} 
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}
