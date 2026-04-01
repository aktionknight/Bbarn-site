import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { addEffect } from '@react-three/fiber';

// Context for Lenis instance
const LenisContext = createContext(null);

/**
 * LenisProvider: Creates a single Lenis instance for smooth scrolling
 * Syncs with React Three Fiber's animation loop
 * All Canvas components use this to sync their scroll with page scroll
 */
export function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    // Create single Lenis instance
    const lenis = new Lenis({
      duration: 2,
      smooth: true,
    });

    lenisRef.current = lenis;

    // Sync with React Three Fiber animation loop
    // This will be called for each active Canvas component
    cleanupRef.current = addEffect((time) => {
      lenis.raf(time);
    });

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * useLenis: Hook to get Lenis instance (mostly for internal use)
 */
export function useLenis() {
  const context = useContext(LenisContext);
  if (!context && typeof window !== 'undefined') {
    console.warn('useLenis must be used within LenisProvider');
  }
  return context;
}
