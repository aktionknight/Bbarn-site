import React from 'react';
import { ScrollProvider } from './ScrollManager';
import { LenisProvider } from './LenisProvider';
import { FadeOverlay } from './FadeOverlay';
import HeaderComp from '../components/header';
import Cursor from './cursor';
import IntroSequence from '../components/intro';
import StoolModel from '../components/stool';
import Scene from '../components/scene';
import TextOverlay from '../components/textoverlay';
import FlyingComp from '../components/flying';
import Demos from '../components/demos';

import GridBackground from '../components/GridBackground';

/**
 * PageWrapper: Wraps entire page with providers
 * This ensures all child components have access to ScrollProvider and LenisProvider contexts
 */
export default function PageWrapper() {
  return (
    <LenisProvider>
      <ScrollProvider>
        <FadeOverlay />

        <HeaderComp />

        <div className="cursor z-100">
          <Cursor />
        </div>
        <div id="intro-canvas-wrapper" className="transition-opacity duration-1000">
          <IntroSequence />
        </div>

        <div className="relative h-[600vh] w-full z-40"></div>

        <div className="relative h-[1000vh]" id="rotation-track"></div>

        <div id="stool-wrapper" className="fixed inset-0 w-full h-full opacity-0 pointer-events-none transition-opacity duration-1000">
          <div className="absolute inset-0 w-full h-full z-0 mt-[-10vh]">
            <StoolModel />
          </div>
        </div>

        <div id="scene-wrapper" className="fixed inset-0 w-full h-full z-20 opacity-0 pointer-events-none transition-opacity duration-1000">
          <div className="absolute inset-0 w-full h-full mt-[-10vh]">
            <Scene />
          </div>
        </div>

        <div className="relative bg-white text-black min-h-screen flex flex-col items-center pt-32">

          <div className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-1000" id="text-overlay">
            <TextOverlay />
          </div>

          <div id="zoomin" className="h-[600vh] w-full z-10">
            <FlyingComp />
          </div>
        </div>

        {/* Updated section with Grid Background and changed to transparent */}
        <div className="relative z-30 bg-red-900 text-white h-[500vh] flex flex-col items-center">
          <GridBackground />
          <h2 className="fixed text-6xl font-bold mt-[20vh] z-10 mix-blend-difference text-white">What do we do ?</h2>
          <Demos />
        </div>

        <div className="relative bg-black w-screen h-[100vh] z-30">Hello</div>
      </ScrollProvider>
    </LenisProvider>
  );
}
