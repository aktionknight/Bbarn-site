import React,{useRef} from 'react';
import {useFrame, } from '@react-three/fiber';
import {SpotLight } from '@react-three/drei';
import { Vector3 } from 'three';



export default function Spotlight()
{

    const lightRef = React.useRef();

    useFrame(()=>
    {
        const track = document.getElementById('rotation-track');
    if (!track) return;
    const box = track.getBoundingClientRect();
    const scrollDistance = box.height - window.innerHeight;
    let progress = -box.top / scrollDistance;

    // Safety Clamps
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    // --- ANIMATION LOGIC ---
    // We want the light to be OFF at start, and fade IN quickly.
    // Logic: 0 -> 0 intensity. 0.2 -> 5 intensity.
    let intensity = progress / 0.2;
    if (intensity > 1) intensity = 1;

    if (lightRef.current) {
        // Ramp intensity from 0 to 5
        lightRef.current.intensity = intensity * 5;
    }
    })

    return (
        <SpotLight
      ref={lightRef}
      position={[3, 5, 0]}    // High up and to the right
      target-position={[0, -2, -2]} // Pointing directly at the TV
      distance={15}           // How far the light reaches
      angle={2}             // Width of the beam (narrower = more dramatic)
      attenuation={5}         // How the light fades (foggy effect)
      anglePower={5}          // Sharpness of the edges
      color="#ff6363" 
    />
    )
}