import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Context for scroll data
const ScrollContext = createContext(null);

/**
 * ScrollProvider: Centralized scroll listener
 * Fires once per scroll event with throttling
 * Provides scroll progress for different sections to all components
 */
export function ScrollProvider({ children }) {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    rotationProgress: 0,      // For rotation-track section (TV/Stool)
    flyingProgress: 0,        // For zoomin section (Flying text)
    introProgress: 0,         // For intro section
    introFadeOut: 1,          // Opacity for fading out intro
  });

  const refsCache = useRef({
    rotationTrack: null,
    flyingTrack: null,
    introHeight: window.innerHeight * 4,
  });

  // Cache DOM refs on first reference
  const getElementCached = (id) => {
    if (!refsCache.current[id]) {
      refsCache.current[id] = document.getElementById(id);
    }
    return refsCache.current[id];
  };

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        requestAnimationFrame(() => {
          // Get cached DOM elements
          const rotationTrack = getElementCached('rotation-track');
          const flyingTrack = getElementCached('zoomin');
          const introHeight = refsCache.current.introHeight;
          const windowHeight = window.innerHeight;

          // Calculate rotation progress (for TV/Stool rotation)
          let rotationProgress = 0;
          if (rotationTrack) {
            const box = rotationTrack.getBoundingClientRect();
            const scrollY = box.height - windowHeight;
            rotationProgress = -box.top / scrollY;
            rotationProgress = Math.max(0, Math.min(1, rotationProgress));
          }

          // Calculate flying progress (for text convergence)
          let flyingProgress = 0;
          if (flyingTrack) {
            const box = flyingTrack.getBoundingClientRect();
            const scrollY = box.height - windowHeight;
            if (scrollY > 0) {
              flyingProgress = -box.top / scrollY;
            }
            flyingProgress = Math.max(0, Math.min(1, flyingProgress));
          }

          // Calculate intro progress & fade
          let introProgress = 0;
          let introFadeOut = 1;
          introProgress = lastScrollY / (introHeight - windowHeight);
          introProgress = Math.max(0, Math.min(1, introProgress));

          // Fade out intro at 80%
          if (introProgress > 0.8) {
            introFadeOut = 1 - ((introProgress - 0.8) / 0.2);
            introFadeOut = Math.max(0, introFadeOut);
          }

          setScrollData({
            scrollY: lastScrollY,
            rotationProgress,
            flyingProgress,
            introProgress,
            introFadeOut,
          });

          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={scrollData}>
      {children}
    </ScrollContext.Provider>
  );
}

/**
 * useScrollProgress: Hook to get scroll data in components
 * Usage: const { rotationProgress, flyingProgress } = useScrollProgress();
 */
export function useScrollProgress() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollProgress must be used within ScrollProvider');
  }
  return context;
}
