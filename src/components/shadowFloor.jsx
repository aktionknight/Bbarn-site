import React from 'react';
export default function ShadowFloor() {
  return (
    // Rotate -90deg to lay flat
    // Position it slightly below your object (e.g. y = -2.1 for TV)
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      {/* shadowMaterial is invisible EXCEPT for the shadow itself */}
      <shadowMaterial />
    </mesh>
  );
}