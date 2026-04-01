import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF,ContactShadows} from '@react-three/drei';
import React, { useRef } from 'react';
import CameraRig from './camera';
import { useScrollProgress } from '../helpers/ScrollManager';


function Stool(){
  const { scene } = useGLTF('/stool.glb');

  const groupRef = useRef(); 
  
  const totalSpins = 2; 
  const { rotationProgress } = useScrollProgress();

  // The 60FPS Game Loop
  useFrame(() => {
    if (!groupRef.current) return;
    
    const progress = rotationProgress;

    // Direct Update (No Re-renders)
    groupRef.current.rotation.y = progress * (Math.PI * 2 * totalSpins);
  });

  return (
    <group ref={groupRef} position={[0,-4.45, -1.3]} className="z-0">
      
    <primitive object={scene} scale={0.05} position={[0,0,0]}/>
    </group>
  );}

function Bg()
{
  const posRef = useRef();
  const {scene,materials} = useGLTF('/BG-test.glb');

  return(
    <>
    <primitive object={scene} position={[0,-9,-3]} rotation={[0,-1.6,0]} scale={7}/>
    <ContactShadows
            position={[0, -4, 0]} 
            opacity={1.1}
            scale={20}
            blur={1.3}
            far={8}
          />
    </>
  );

}


export default function StoolModel() {
  return (
    <Canvas shadows style={{ background: 'transparent', pointerEvents: 'none' }}>
      <CameraRig />
      <Stool />
      <Bg />
    </Canvas>
  );
}