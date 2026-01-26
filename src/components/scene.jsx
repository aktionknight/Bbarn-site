import { Canvas, useFrame, addEffect } from '@react-three/fiber';
import { useGLTF, ContactShadows, useVideoTexture } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import CameraRig from './camera';
import Spotlight from './spotlight';

import Dust from './dust';

// --- PART 1: THE TV COMPONENT ---
function Tv() {
  // 1. VIDEO SETUP
  const urlVid = '/PORTFOLIO.mp4';
  const videoTexture = useVideoTexture(urlVid, {
    start: false,
    muted: true,
    loop: true,
  });

  const [hasPlayed, setHasPlayed] = useState(false);
  const { scene, materials } = useGLTF('/bbarn-tv.glb');
  

  
  // REFS
  const groupRef = useRef();
  const shadowRef = useRef();
  const dustRef = useRef();
  const totalSpins = 2;

  // --- HELPER: Safely set opacity on Groups OR Meshes ---
  const setOpacity = (obj, opacity) => {
    if (!obj) return;
    
    // If it's a Mesh (has a material), set it
    if (obj.material) {
      obj.material.transparent = true; // Ensure transparency is on
      obj.material.opacity = opacity;
    }
    
    // If it's a Group (has children), loop through them and set their opacity
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((child) => setOpacity(child, opacity));
    }
  };

  // 2. INITIAL SETUP
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    videoTexture.flipY = false;
    videoTexture.offset.set(0.1, -0.247);
    videoTexture.repeat.set(0.8, 1.5);

    const screenMat = materials['Material.001'];
    if (screenMat) {
        screenMat.map = videoTexture;
        screenMat.emissiveMap = videoTexture;
        screenMat.emissiveIntensity = 0; 
        screenMat.needsUpdate = true;
    }
  }, [scene, materials, videoTexture]);

  // 3. ANIMATION LOOP
  useFrame(() => {
    if (!groupRef.current) return;
    
    const track = document.getElementById('rotation-track');
    if (!track) return;

    const box = track.getBoundingClientRect();
    const scrollY = box.height - window.innerHeight;       
    let progress = -box.top / scrollY;

    // Clamps
    if (progress < 0) progress = 0; 
    if (progress > 1) progress = 1;

    // Rotation
    groupRef.current.rotation.y = -progress * (Math.PI * 2 * totalSpins);

    // Screen Intensity
    let intensity = progress / 0.5;
    if (intensity > 1) intensity = 1;
    if (intensity < 0) intensity = 0;

    if (materials['Material.001']) {
      materials['Material.001'].emissiveIntensity = intensity * 20; 
    }

    // --- FADE OUT LOGIC (THE FIX) ---
    let fadeOut = 1;
    if (progress > 0.8) {
       fadeOut = 1 - ((progress - 0.8) / 0.2);
       if (fadeOut < 0) fadeOut = 0;
    }

    // Use the helper function instead of crashing on .material
    if (shadowRef.current) {
        setOpacity(shadowRef.current, 0.7);
    }
    
    if (dustRef.current) {
        setOpacity(dustRef.current, 0.7 * fadeOut);
        // Also hide it completely if opacity is 0 to save performance
        dustRef.current.visible = fadeOut > 0.01;
    }

    // Play Video
    if (progress > 0.99 && !hasPlayed && videoTexture) {
        videoTexture.image.play().catch(e => console.log(e));
        setHasPlayed(true);
    }
  });

  return (
    <>
      <group ref={groupRef} position={[0, -2.7, -2.9]}>
        <primitive object={scene} scale={0.05} />
        
      </group>

      
      
      <group ref={dustRef}>
         <Dust count={2000} />
      </group>
    </>
  );
}



// --- PART 2: THE SCENE MANAGER ---
export default function Scene() {
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      smooth: true,
    });
   
    const cleanup = addEffect((time) => {
      lenis.raf(time);
    });

    return () => {
      lenis.destroy();
      cleanup();
    };
  }, []);

  return (
    <Canvas shadows style={{ pointerEvents: 'none' }}>
      <CameraRig />
      
      
      
      {/* Tv now handles the Shadows and Dust itself */}
      <Tv />
      
    </Canvas>
  );
}