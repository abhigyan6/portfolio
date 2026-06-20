"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraRig() {
  const { camera } = useThree();
  const target = useRef({ z: 12, rotX: 0, rotY: 0 });
  const current = useRef({ z: 12, rotX: 0, rotY: 0, rotZ: 0 });
  
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    camera.position.set(0, 0, 12);
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Calculate velocity
      const delta = scrollY - lastScrollY.current;
      scrollVelocity.current = delta;
      lastScrollY.current = scrollY;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      // Camera moves deeper as you scroll
      target.current.z = THREE.MathUtils.lerp(12, -20, progress);
      // Subtle base rotation
      target.current.rotX = progress * 0.08;
      target.current.rotY = progress * -0.15;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [camera]);

  useFrame((state) => {
    // Decay velocity smoothly
    scrollVelocity.current *= 0.92;

    // Calculate dynamic tilt based on velocity
    // When scrolling down rapidly, the camera tilts down (pitch) and barrel rolls slightly
    const targetPitch = target.current.rotX + (scrollVelocity.current * -0.0015);
    const targetRoll = scrollVelocity.current * -0.002;

    // Smooth lerp towards target
    current.current.z += (target.current.z - current.current.z) * 0.05;
    current.current.rotX += (targetPitch - current.current.rotX) * 0.08;
    current.current.rotY += (target.current.rotY - current.current.rotY) * 0.05;
    current.current.rotZ += (targetRoll - current.current.rotZ) * 0.08;

    state.camera.position.z = current.current.z;
    state.camera.rotation.x = current.current.rotX;
    state.camera.rotation.y = current.current.rotY;
    state.camera.rotation.z = current.current.rotZ;
  });

  return null;
}
