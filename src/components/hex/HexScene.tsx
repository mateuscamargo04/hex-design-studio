import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function HexField() {
  const group = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const items = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number; rot: number }[] = [];
    const rows = 9;
    const cols = 13;
    for (let r = -rows; r <= rows; r++) {
      for (let c = -cols; c <= cols; c++) {
        const x = c * 1.75 + (r % 2 === 0 ? 0 : 0.875);
        const y = r * 1.52;
        const dist = Math.hypot(x, y);
        if (dist > 12) continue;
        arr.push({ pos: [x, y, 0], scale: 0.9 - dist * 0.02, rot: dist * 0.05 });
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    mouse.current.x += (state.mouse.x - mouse.current.x) * 0.06;
    mouse.current.y += (state.mouse.y - mouse.current.y) * 0.06;
    group.current.rotation.x = mouse.current.y * 0.25 + Math.sin(t * 0.15) * 0.05;
    group.current.rotation.y = -mouse.current.x * 0.35 + Math.cos(t * 0.12) * 0.05;
    group.current.children.forEach((child, i) => {
      const item = items[i];
      if (!item) return;
      const d = Math.hypot(item.pos[0] - mouse.current.x * 8, item.pos[1] - mouse.current.y * 6);
      const wave = Math.sin(t * 0.9 - d * 0.35) * 0.25;
      child.position.z = wave;
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = Math.max(0, 0.6 - d * 0.06);
    });
  });

  return (
    <group ref={group} position={[0, 0, -2]}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} rotation={[0, 0, Math.PI / 6]} scale={it.scale}>
          <cylinderGeometry args={[0.85, 0.85, 0.14, 6]} />
          <meshStandardMaterial
            color="#f5f5f7"
            emissive="#ffffff"
            emissiveIntensity={0}
            metalness={0.35}
            roughness={0.55}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HexScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-6, -4, 4]} intensity={0.35} color="#1d1d1f" />
      <HexField />
      <Environment preset="studio" />
      <fog attach="fog" args={["#ffffff", 8, 22]} />
    </Canvas>
  );
}
