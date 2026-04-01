import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ContactShadows, useVideoTexture } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import CameraRig from './camera';
import Spotlight from './spotlight';
import FlyingComp from './flying';
import { useScrollProgress } from '../helpers/ScrollManager';

import Dust from './dust';

// --- PART 1: THE TV COMPONENT ---
function Tv() {
  // 1. VIDEO SETUP - Lazy load (will be created on-demand when needed)
  const [videoTexture, setVideoTexture] = useState(null);
  const urlVid = '/PORTFOLIO.mp4';
  
  // Load video texture only when near playback point
  const videoTextureResource = useVideoTexture(urlVid, {
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
  const bodyLightRef = useRef();

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

    // Only set up video texture when it's loaded
    if (videoTextureResource) {
      setVideoTexture(videoTextureResource);
      
      videoTextureResource.flipY = false;
      videoTextureResource.offset.set(0.1, -0.247);
      videoTextureResource.repeat.set(0.8, 1.5);

      const screenMat = materials['TVScreen.002'];
      
      if (screenMat) {
          screenMat.map = videoTextureResource;
          screenMat.emissiveMap = videoTextureResource;
          screenMat.emissiveIntensity = 0; 
          screenMat.needsUpdate = true;
      }
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

  }, [scene, materials, videoTextureResource]);


  // 3. ANIMATION LOOP
  const { rotationProgress, introFadeOut } = useScrollProgress();
  const trackRef2 = useRef(null);

  useFrame(() => {
    if (!groupRef.current) return;

    // Cache reference to flying track element
    if (!trackRef2.current) {
      trackRef2.current = document.getElementById('zoomin');
    }

    const track2 = trackRef2.current;
    let progress2 = 0;

    if (track2) {
      const track2box = track2.getBoundingClientRect();
      const scrollY2 = track2box.height - window.innerHeight;
      progress2 = -0.5 * track2box.top / scrollY2;
      if (progress2 < 0) progress2 = 0;
      if (progress2 > 0.35) progress2 = 0.35;
    }

    const progress = rotationProgress;
    const totalSpins = 2;

    // Rotation
    groupRef.current.rotation.y = -progress * (Math.PI * 2 * totalSpins);
    
    if(progress2 > 0) {
      groupRef.current.position.z = -2.9 + progress2 * 5;
      groupRef.current.position.y = -2.7 + progress2 * 1.5;
    } else {
      groupRef.current.position.z = -2.9;
      groupRef.current.position.y = -2.7;
    }

    // Screen Intensity
    let intensity = progress / 0.5;
    if (intensity > 1) intensity = 1;
    if (intensity < 0) intensity = 0;

    if (materials['TVScreen.002']) {
      materials['TVScreen.002'].emissiveIntensity = intensity * 15; 
    }

    // --- FADE OUT LOGIC ---
    const fadeOut = introFadeOut;

    // Use the helper function instead of crashing on .material
    if (shadowRef.current) {
        setOpacity(shadowRef.current, 0.7);
    }
    
    if (dustRef.current) {
        setOpacity(dustRef.current, 0.7 * fadeOut);
        // Hide completely if opacity is too low to save performance
        dustRef.current.visible = fadeOut > 0.01;
    }

    // Play Video only when near the end
    if (progress > 0.99 && !hasPlayed && videoTexture) {
        videoTexture.image.play().catch(e => console.log(e));
        setHasPlayed(true);
    }
  });

  return (
    <>
      <group ref={groupRef} position={[0, -2.7, -2.9]}>
        <primitive object={scene} scale={0.05} />
        <ContactShadows
                    position={[9, -1, -2.9]} 
                    opacity={1.1}
                    scale={20}
                    blur={1.3}
                    far={8}
                  />
      </group>

      
      
      <group ref={dustRef}>
         <Dust count={800} />
      </group>
    </>
  );
}



// --- PART 2: THE SCENE MANAGER ---
export default function Scene() {
  return (
    <Canvas shadows style={{pointerEvents: 'none' }}>
      
      <CameraRig />
      
      <pointLight intensity={500} />
      
      {/* Tv now handles the Shadows and Dust itself */}
      <Tv />
      
    </Canvas>
  );
}