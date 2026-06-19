"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WarpLines({ count = 300 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Store initial random positions
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60,
        z: (Math.random() - 0.5) * 100,
        speed: Math.random() * 0.5 + 0.5,
      });
    }
    return pos;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(1, 1, 0.01);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, positions]);

  const scrollRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - scrollRef.current;
      velocityRef.current = delta;
      scrollRef.current = current;
    };
    
    // Set initial scroll
    scrollRef.current = window.scrollY;
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    // Decay velocity smoothly
    velocityRef.current *= 0.92;
    const absVel = Math.abs(velocityRef.current);
    
    // Target opacity and stretch based on scroll speed above a threshold
    const triggerThreshold = 35; // Pixels per frame delta deadzone
    const activeVel = Math.max(0, absVel - triggerThreshold);
    
    const targetOpacity = Math.min(activeVel * 0.02, 0.8);
    const targetScaleZ = Math.min(activeVel * 1.0 + 0.1, 60);
    
    materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.1;
    
    positions.forEach((p, i) => {
      // Move lines toward camera when scrolling down, backward when up
      const dir = velocityRef.current > 0 ? 1 : -1;
      p.z += p.speed * absVel * 0.15 * dir;
      
      // Wrap around logic
      if (p.z > 50) p.z -= 100;
      if (p.z < -50) p.z += 100;

      dummy.position.set(p.x, p.y, p.z);
      // Stretch the Z axis
      dummy.scale.set(1, 1, targetScaleZ);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.04, 0.04, 1]} />
      <meshBasicMaterial 
        ref={materialRef} 
        color="#a78bfa" // Light violet warp lines
        transparent 
        opacity={0} 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
