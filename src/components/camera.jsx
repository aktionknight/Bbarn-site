import React,{useEffect, useRef,useState,useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import { Vector3 , QuadraticBezierCurve3} from 'three';



export default function CameraRig()
{
    const curve = useMemo(() => {
    return new QuadraticBezierCurve3(
      new Vector3(0, 2, 7),    // START (Default)
      new Vector3(0,-1, 4),    // CONTROL POINT (The "Magnet") -> Pulls camera RIGHT
      new Vector3(0, 0, 3)     // END (High & Back)
    );
  }, []);

    useFrame((state)=>
    {
        const track = document.getElementById('rotation-track');
        if(!track) return;

        const box =track.getBoundingClientRect();
        const scrollY = box.height - window.innerHeight;       
        let progress = -box.top/scrollY;
        if(progress>1) progress=1;
        if(progress<0) progress=0;
        const pointoncurve = curve.getPoint(progress);

        //const startpos = new Vector3(0,2,7);
        //const endpos = new Vector3(0,0,3);
        state.camera.position.copy(pointoncurve);
        //force looking
        state.camera.lookAt(0,0,0);
    }

    );
    return null;
}