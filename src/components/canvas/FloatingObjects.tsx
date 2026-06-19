"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

const SHAPES = ["icosahedron", "torus", "octahedron", "torusKnot"] as const;

interface ObjectData {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  shape: (typeof SHAPES)[number];
  floatSpeed: number;
  color: string;
  wireframe: boolean;
}

export default function FloatingObjects({ count = 35 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const objects: ObjectData[] = useMemo(() => {
    const colors = ["#1a1a2e", "#16213e", "#0f3460", "#1a1a1a", "#2d2d2d", "#111111"];
    return Array.from({ length: count }).map((_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 60 - 15
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ),
      scale: Math.random() * 0.6 + 0.15,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      floatSpeed: Math.random() * 0.3 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      wireframe: Math.random() > 0.6,
    }));
  }, [count]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.015;
    groupRef.current.rotation.x += delta * 0.008;
  });

  const renderGeometry = (shape: ObjectData["shape"]) => {
    switch (shape) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "torus":
        return <torusGeometry args={[1, 0.35, 16, 48]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.3, 64, 16]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <Float
          key={i}
          speed={obj.floatSpeed}
          rotationIntensity={1.2}
          floatIntensity={1.5}
          position={obj.position}
        >
          <mesh rotation={obj.rotation} scale={obj.scale}>
            {renderGeometry(obj.shape)}
            <meshStandardMaterial
              color={obj.color}
              roughness={obj.wireframe ? 0.8 : 0.15}
              metalness={obj.wireframe ? 0.2 : 0.95}
              wireframe={obj.wireframe}
              envMapIntensity={1.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
