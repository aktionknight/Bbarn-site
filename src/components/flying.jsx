import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// --- CONFIGURATION ---
const WORDS_DATA = [
  { text: "Branding", pos: [-6, 4, 0] },   // Top Left
  { text: "Content Shoots", pos: [40, -8, 0] },  // Bottom Right
  { text: "Editing", pos: [-20, 0, 0] }, 
  { text: "Animation", pos: [-23, -7, 0] }, 
  { text: "Illustrations", pos: [40, 0, 0]},   // Bottom Left
  { text: "Design", pos: [25, 5, 0] },
  {text:"Customs", pos:[-40,7,0]}         // Top Right
];

function FlyingScene() {
  const groupRef = useRef();
  const letterRefs = useRef([]); 

  useFrame(() => {
    const box = document.getElementById("zoomin");
    if (!box || !groupRef.current) return;

    const rect = box.getBoundingClientRect();
    const scrollAvailable = rect.height - window.innerHeight;

    let progress = 0;
    if (scrollAvailable > 0) {
        progress = -rect.top / scrollAvailable;
    }
    
    // Clamp Progress
    if (progress > 1) progress = 1;
    if (progress < 0) progress = 0;

    const slowp =progress*1;

    // --- 1. CONVERGENCE LOGIC ---
    letterRefs.current.forEach((letterObj, index) => {
        if(!letterObj) return;

        const initialX = WORDS_DATA[index].pos[0];
        const initialY = WORDS_DATA[index].pos[1];
        
        // A. X-Axis: Target is 0 (Horizontal Center)
        // Formula: Start -> 0
        letterObj.position.x = initialX * (1 - slowp)*0.6;

        // B. Y-Axis: Target is -2.7 (Vertical TV Position)
        // Formula: Start + (Distance * Progress)
        const targetY = -3.2;
        letterObj.position.y = initialY + ((slowp) * (targetY - initialY));

        // C. Scale Logic (Fake Depth)
        // Start Scale: 2 (Big/Close) -> End Scale: 0 (Tiny/Far)
        const startScale = 2; 
        const currentScale = startScale * (1 - slowp)*(index+1)/2.5;
        
        letterObj.scale.set(currentScale, currentScale, currentScale);
    });
  });

  return (
    <group ref={groupRef}>
      {WORDS_DATA.map((word, i) => (
        <Letter 
            key={i} 
            ref={(el) => (letterRefs.current[i] = el)}
            text={word.text} 
            pos={word.pos} 
        />
      ))}
    </group>
  );
}

// --- HELPER ---
const Letter = React.forwardRef(({ text, pos }, ref) => {
  return (
    <Text
      ref={ref}
      position={pos}
      color="black"
      fontSize={1} 
      anchorX="center"
      anchorY="middle"
      // font="/fonts/Helvetica.ttf" 
    >
      {text}
    </Text>
  );
});

export default function FlyingComp() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas style={{ background: 'transparent' }}> 
        <ambientLight intensity={1} />
        <FlyingScene />
      </Canvas>
    </div>
  );
}