"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraRig() {
  const { camera } = useThree();
  const target = useRef({ z: 12, rotX: 0, rotY: 0 });
  const current = useRef({ z: 12, rotX: 0, rotY: 0 });

  useEffect(() => {
    camera.position.set(0, 0, 12);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      // Camera moves from z=12 to z=-20 as you scroll
      target.current.z = THREE.MathUtils.lerp(12, -20, progress);
      // Subtle rotation
      target.current.rotX = progress * 0.08;
      target.current.rotY = progress * -0.15;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [camera]);

  useFrame(() => {
    // Smooth lerp towards target — no GSAP needed
    current.current.z += (target.current.z - current.current.z) * 0.05;
    current.current.rotX += (target.current.rotX - current.current.rotX) * 0.05;
    current.current.rotY += (target.current.rotY - current.current.rotY) * 0.05;

    camera.position.z = current.current.z;
    camera.rotation.x = current.current.rotX;
    camera.rotation.y = current.current.rotY;
  });

  return null;
}
