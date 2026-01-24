import React,{useEffect, useRef,useState,useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import { Vector3 , QuadraticBezierCurve3} from 'three';
import { EffectComposer,DepthOfField } from '@react-three/postprocessing';


export default function CameraRig()
{

    const dofRef = useRef();

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
        const blurDiv = document.getElementById('blur');

        if(!track) return;
        
        const blurRect = blurDiv.getBoundingClientRect();
        let blurIntensity = blurRect.bottom/blurRect.height;
        

        const box =track.getBoundingClientRect();
        const scrollY = box.height - window.innerHeight;       
        let progress = -box.top/scrollY;
        if(progress>1) progress=1;
        if(progress<0) progress=0;
        const pointoncurve = curve.getPoint(progress);

        if(blurIntensity>1) blurIntensity=1;
        if(blurIntensity<0)blurIntensity=0;
        if(dofRef.current)dofRef.current.bokehScale = blurIntensity*10;

        let exposureProg = progress/0.5;
        if(exposureProg>1) exposureProg=1;
        if(exposureProg<0) exposureProg=0;
       // let exposureProgress = exposureProg;
        let exposure = 0.2 + (exposureProg);
        
        state.gl.toneMappingExposure = exposure;
        //const startpos = new Vector3(0,2,7);
        //const endpos = new Vector3(0,0,3);
        state.camera.position.copy(pointoncurve);
        //force looking
        state.camera.lookAt(0,0,0);
    }

    );
    return null;
}