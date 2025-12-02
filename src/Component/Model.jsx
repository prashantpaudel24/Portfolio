import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Model({ url }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  // Traverse all meshes to apply hologram-like material
  scene.traverse((child) => {
    if (child.isMesh) {
      // Keep original color/texture
      if (child.material.map) {
        child.material = new THREE.MeshStandardMaterial({
          map: child.material.map,
          color: 0xffffff, // ensures textures show correctly
          transparent: true,
          opacity: 0.6, // semi-transparent for hologram
          emissive: new THREE.Color(0x00ffff), // cyan glow
          emissiveIntensity: 0.5,
          side: THREE.DoubleSide, // prevent inside clipping
        });
      } else {
        child.material = new THREE.MeshStandardMaterial({
          color: child.material.color || 0xffffff,
          transparent: true,
          opacity: 0.6,
          emissive: new THREE.Color(0x00ffff),
          emissiveIntensity: 0.5,
          side: THREE.DoubleSide,
        });
      }

      // Optional: add a slight glow outline
      child.material.depthWrite = false;
    }
  });

  useFrame(({ mouse }) => {
    if (modelRef.current) {
      // Continuous rotation
      modelRef.current.rotation.y += 0.01;

      // Smooth parallax tilt
      const tiltX = mouse.y * 0.3;
      const tiltY = mouse.x * 0.3;

      modelRef.current.rotation.x = tiltX;
      modelRef.current.rotation.z = -tiltY;
    }
  });

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={2}
    />
  );
}
