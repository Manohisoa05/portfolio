"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Sphère numérique : icosaèdre en fil de fer + nuage de points orbitaux.
 * Volontairement léger (peu de géométrie, pas de post-processing).
 */
function DigitalSphere({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);

  // Nuage de points répartis sur une sphère
  const positions = useMemo(() => {
    const count = 500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.9 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.15 + pointer.x * 0.3;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.15 + pointer.y * 0.2;
    }
    if (points.current) {
      points.current.rotation.y = -t * 0.06;
    }
  });

  return (
    <group ref={group}>
      {/* Sphère principale en fil de fer */}
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial color="#4f7cff" wireframe transparent opacity={0.45} />
      </mesh>
      {/* Cœur lumineux */}
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Points orbitaux */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#22d3ee"
          size={0.035}
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
      {/* Anneau orbital */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.3, 0.006, 8, 90]} />
        <meshBasicMaterial color="#4f7cff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      aria-hidden
    >
      <ambientLight intensity={0.6} />
      <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <DigitalSphere animate={!reduced} />
      </Float>
    </Canvas>
  );
}
