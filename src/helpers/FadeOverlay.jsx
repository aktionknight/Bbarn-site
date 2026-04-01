import React, { useEffect } from 'react';
import { useScrollProgress } from './ScrollManager';

/**
 * FadeOverlay: Handles the opacity transitions for intro/scene/stool sections
 * Replaces the old fade.js with optimized React-based approach
 */
export function FadeOverlay() {
  const { scrollY } = useScrollProgress();
  const introHeight = window.innerHeight * 4;

  useEffect(() => {
    const sceneWrapper = document.getElementById('scene-wrapper');
    const stoolWrapper = document.getElementById('stool-wrapper');
    const introCanvas = document.getElementById('intro-canvas-wrapper');
    const textOverlay = document.getElementById('text-overlay');

    const isBeyondIntro = scrollY > introHeight * 0.9;

    // Update DOM classes based on scroll position
    if (sceneWrapper) {
      if (isBeyondIntro) {
        sceneWrapper.classList.remove('opacity-0', 'pointer-events-none');
        sceneWrapper.classList.add('opacity-100');
      } else {
        sceneWrapper.classList.add('opacity-0', 'pointer-events-none');
        sceneWrapper.classList.remove('opacity-100');
      }
    }

    if (stoolWrapper) {
      if (isBeyondIntro) {
        stoolWrapper.classList.remove('opacity-0', 'pointer-events-none');
        stoolWrapper.classList.add('opacity-100');
      } else {
        stoolWrapper.classList.add('opacity-0', 'pointer-events-none');
        stoolWrapper.classList.remove('opacity-100');
      }
    }

    if (textOverlay) {
      if (isBeyondIntro) {
        textOverlay.classList.remove('opacity-0', 'pointer-events-none');
        textOverlay.classList.add('opacity-100');
      } else {
        textOverlay.classList.add('opacity-0', 'pointer-events-none');
        textOverlay.classList.remove('opacity-100');
      }
    }

    if (introCanvas) {
      if (isBeyondIntro) {
        introCanvas.classList.add('opacity-0', 'pointer-events-none');
      } else {
        introCanvas.classList.remove('opacity-0', 'pointer-events-none');
      }
    }
  }, [scrollY, introHeight]);

  return null; // This component only manages DOM updates
}
