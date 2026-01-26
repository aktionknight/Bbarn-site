import React,{ useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function Dust({ count = 1000 }) {
  const mesh = useRef();
  const texture = useLoader(THREE.TextureLoader, '/dust.png');

  // 1. Generate Random Positions (Once)
  const particlesPosition = useMemo(() => {
    // Create an array to hold X, Y, Z for every particle
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random spread between -10 and 10
      let x = (Math.random() - 0.5) * 20;
      let y = (Math.random() - 0.5) * 20;
      let z = (Math.random() - 0.5) * 20;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, [count]);

  // 2. Animate the Cloud
  useFrame((state, delta) => {
    if (mesh.current) {
        // Rotate the whole cloud slowly for "floating" feel
        //mesh.current.rotation.y += delta * 0.05;
       // mesh.current.rotation.x += delta * 0.01;
        
        // Optional: Gentle wave motion
       mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      mesh.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    
      }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      {/* size: How big the specks are
         sizeAttenuation: Make them smaller when further away (True 3D look)
         depthWrite={false}: CRITICAL. Allows particles to overlap without glitching.
      */}
      <pointsMaterial
        map={texture}
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation={true}
        depthWrite={false} 
      />
    </points>
  );
}