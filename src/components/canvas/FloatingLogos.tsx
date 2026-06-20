"use client";

import { useState, useEffect } from "react";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

interface ToolBadge {
  name: string;
  svg: string;
  color: string;
  position: THREE.Vector3;
  floatSpeed: number;
}

// Inline SVG paths for real logos
const TOOLS: Omit<ToolBadge, "position" | "floatSpeed">[] = [
  {
    name: "Figma",
    color: "#a259ff",
    svg: `<svg viewBox="0 0 38 57" fill="none"><path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/><path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/></svg>`,
  },
  {
    name: "React",
    color: "#61dafb",
    svg: `<svg viewBox="0 0 24 24" fill="#61dafb"><circle cx="12" cy="12" r="2.2"/><g fill="none" stroke="#61dafb" stroke-width="1"><ellipse rx="11" ry="4.2" cx="12" cy="12"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(60 12 12)"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(120 12 12)"/></g></svg>`,
  },
  {
    name: "Photoshop",
    color: "#31a8ff",
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#001E36"/><text x="3" y="17" font-family="Arial" font-weight="bold" font-size="12" fill="#31A8FF">Ps</text></svg>`,
  },
  {
    name: "Illustrator",
    color: "#ff9a00",
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#330000"/><text x="4" y="17" font-family="Arial" font-weight="bold" font-size="12" fill="#FF9A00">Ai</text></svg>`,
  },
  {
    name: "Canva",
    color: "#00c4cc",
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#7D2AE8"/><circle cx="12" cy="12" r="5" fill="#00C4CC"/><circle cx="12" cy="12" r="2" fill="#fff"/></svg>`,
  },
  {
    name: "Blender",
    color: "#ea7600",
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="9" fill="#EA7600"/><ellipse cx="12" cy="13" rx="6" ry="4.5" fill="#fff"/><ellipse cx="12" cy="13" rx="3" ry="2" fill="#265787"/><circle cx="12" cy="13" r="1" fill="#fff"/></svg>`,
  },
  {
    name: "Spline",
    color: "#b4f74c",
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#1a1a2e"/><path d="M6 18Q12 6 18 12" stroke="#B4F74C" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="6" cy="18" r="2" fill="#B4F74C"/><circle cx="18" cy="12" r="2" fill="#B4F74C"/></svg>`,
  },
  {
    name: "JavaScript",
    color: "#f7df1e",
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#F7DF1E"/><text x="6" y="19" font-family="Arial" font-weight="bold" font-size="13" fill="#323330">JS</text></svg>`,
  },
  {
    name: "HTML5",
    color: "#e34f26",
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M2 2l1.8 20L12 24l8.2-2L22 2H2z" fill="#E34F26"/><path d="M12 4v18l6.5-1.8L20 4H12z" fill="#EF652A"/><text x="6" y="17" font-family="Arial" font-weight="bold" font-size="8" fill="#fff">5</text></svg>`,
  },
  {
    name: "CSS3",
    color: "#264de4",
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M2 2l1.8 20L12 24l8.2-2L22 2H2z" fill="#264DE4"/><path d="M12 4v18l6.5-1.8L20 4H12z" fill="#2965F1"/><text x="6" y="17" font-family="Arial" font-weight="bold" font-size="8" fill="#fff">3</text></svg>`,
  },
  {
    name: "Tailwind",
    color: "#38bdf8",
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.4 10.88 14.5 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.6 7.12 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.4 16.88 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.6 13.12 9.5 12 7 12z" fill="#38BDF8"/></svg>`,
  },
  {
    name: "VS Code",
    color: "#007acc",
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M17 2l5 3.5v13L17 22l-7-5.5L4 22l-3-2.5v-15L4 2l6 5.5L17 2z" fill="#007ACC" opacity="0.8"/><path d="M17 2v20l5-3.5v-13L17 2z" fill="#1F9CF0"/><path d="M10 12L4 7v10l6-5z" fill="#fff" opacity="0.5"/></svg>`,
  },
  {
    name: "GitHub",
    color: "#ffffff",
    svg: `<svg viewBox="0 0 24 24" fill="white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  },
  {
    name: "Next.js",
    color: "#ffffff",
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="white"/><path d="M9 8v8l7-8" fill="black"/><rect x="15" y="8" width="1.5" height="8" fill="black"/></svg>`,
  },
];

export default function FloatingLogos({ count = 22 }: { count?: number }) {
  const [badges, setBadges] = useState<ToolBadge[]>([]);

  useEffect(() => {
    const result: ToolBadge[] = [];
    
    // We want to randomize the order of tools on every refresh
    const shuffledTools = [...TOOLS].sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
      const tool = shuffledTools[i % shuffledTools.length];
      
      // Distribute evenly along the Z axis from z=10 (front) down to z=-30 (deep)
      // This creates the "deep dive" effect as the camera scrolls down to z=-20
      const zBase = 10 - (i * (40 / count));
      const zJitter = (Math.random() - 0.5) * 2;
      const z = zBase + zJitter;

      // Pick a random angle and radius to scatter around the center
      const angle = Math.random() * Math.PI * 2;
      
      // Radius between 6 and 20 guarantees a keep-out zone right in the middle 
      // (avoiding overlap with the "Abhigyan" hero text) while spreading them wide
      const radius = 6 + Math.random() * 14;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      result.push({
        ...tool,
        position: new THREE.Vector3(x, y, z),
        floatSpeed: Math.random() * 0.35 + 0.1,
      });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBadges(result);
  }, [count]);

  if (badges.length === 0) return null;

  return (
    <group>
      {badges.map((badge, i) => (
        <Float
          key={i}
          speed={badge.floatSpeed}
          rotationIntensity={0.2}
          floatIntensity={1.8}
          position={badge.position}
        >
          <Html
            center
            distanceFactor={10}
            transform
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px 32px",
                borderRadius: "24px",
                background: "rgba(15, 15, 20, 0.95)",
                border: `1px solid ${badge.color}50`,
                whiteSpace: "nowrap",
                fontFamily: "system-ui, sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.9)",
                letterSpacing: "0.02em",
                boxShadow: `0 0 50px ${badge.color}25, inset 0 1px 0 rgba(255,255,255,0.1)`,
                transition: "all 0.3s ease",
                transform: "scale(1.2)",
              }}
            >
              <div
                style={{ width: 36, height: 36, flexShrink: 0 }}
                dangerouslySetInnerHTML={{ __html: badge.svg }}
              />
              <span>{badge.name}</span>
            </div>
          </Html>
        </Float>
      ))}
    </group>
  );
}
