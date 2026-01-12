import { Canvas, useFrame, addEffect } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// --- PART 1: THE TV COMPONENT ---
function Tv() {
  const { scene } = useGLTF('/bbarn-tv.glb');
  
  const groupRef = useRef(); 
  
  const totalSpins = 2; 

  // The 60FPS Game Loop
  useFrame(() => {
    if (!groupRef.current) return;
    const currScroll = window.scrollY;
    const threshold = window.innerHeight * 4;
    let targetRotation = 0;

    if (currScroll < threshold) {
       // Calculate precise angle based on scroll progress
       const progress = currScroll / threshold;
       targetRotation = progress * (Math.PI * 2 * totalSpins);
    } else {
       // Snap to final angle if past the tunnel
       targetRotation = Math.PI * 2 * totalSpins;
    }

    // Direct Update (No Re-renders)
    groupRef.current.rotation.y = targetRotation;
  });

  return (
    <group ref={groupRef} position={[0, -2, -2]}>
      <primitive object={scene} scale={0.05} />
    </group>
    
  );
}

// --- PART 2: THE SCENE MANAGER ---
export default function Scene() {
  
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 2,
      smooth: true,
    });

    // 2. SYNC LENIS WITH REACT THREE FIBER
   
    const cleanup = addEffect((time) => {
      lenis.raf(time);
    });

    return () => {
      lenis.destroy();
      cleanup();
    };
  }, []);

  return (
    <Canvas>
      
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 0, 10]} />
      <Tv />
      
    </Canvas>
  );
}