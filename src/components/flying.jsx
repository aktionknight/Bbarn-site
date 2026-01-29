import React,{ useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import {Text} from '@react-three/drei';

function Letter({input,pos})
{
    return(
        <>
        <Text 
        position={pos}
        color="black"
        font="/fonts/Helvetica.ttf"
        >{input}</Text>
        </>
    )
}

export default function FlyingComp()
{

    const groupRef = useRef();

    useFrame(()=>{
    const box = document.getElementById("zoomin");
    const rect = box.getBoundingClientRect();
    if(!rect)return;

    let scrollY =rect.height - window.innerHeight;
    let progress = rect.top/scrollY;

    if(progress>1)progress=1;
    if(progress<0)progress=0;

    const startZ = 20;
    const endZ = 5;
    
    // Linearly interpolate based on scroll
    const currentZ = -(progress * (endZ - startZ));

    groupRef.current.position.z = currentZ; 
    })
    
    


    return(
<group ref={groupRef}>
      {/* Place your letters at different X/Y coordinates so they form a cloud */}
      <Letter input="Test" pos={[-10, -2,-10]} />
      
    </group>
    );
}