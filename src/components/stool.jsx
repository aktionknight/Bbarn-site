import { Canvas, useFrame, addEffect } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import CameraRig from './camera';


function Stool(){
  const { scene } = useGLTF('/stool.glb');

  const groupRef = useRef(); 
  
  const totalSpins = 2; 

  // The 60FPS Game Loop
  useFrame(() => {
    if (!groupRef.current) return;
    const track = document.getElementById('rotation-track');
        if(!track) return;

        const box =track.getBoundingClientRect();
        const scrollY = box.height - window.innerHeight;       
        let progress = -box.top/scrollY;

    if (progress < 0) {
       progress=0;
    } 
    if (progress>1){
       progress=1;
    }

    // Direct Update (No Re-renders)
    if(groupRef.current)
      {
        groupRef.current.rotation.y = progress * (Math.PI * 2 * totalSpins);
      };
  });

  return (
    <group ref={groupRef} position={[0,-4.45, -1.3]} class="z-0">
    <primitive object={scene} scale={0.05} position={[0,0,0]}/>
    </group>
  );}




export default function StoolModel() {
  
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
      <CameraRig />
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 0, 10]} />
      
      <Stool />
    </Canvas>
  );}