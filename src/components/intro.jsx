import React, { useEffect, useRef, useState } from 'react';
import { useScrollProgress } from '../helpers/ScrollManager';

export default function IntroSequence() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { introProgress } = useScrollProgress();

  // --- CONFIGURATION BASED ON YOUR SCREENSHOT ---
  const frameCount = 200;
  const folderPath = '/intro-webp/';

  // Your first file is "bbarn-teaser-bg 00086565.png"
  const startIndex = 86421;

  const getPath = (index) => {
    // 1. Calculate the exact file number (e.g., 86565 + 0 = 86565)
    const fileNumber = startIndex + index;

    // 2. Pad it with zeros to match the 8-digit format (e.g., "00086565")
    const paddedNumber = fileNumber.toString().padStart(8, '0');

    // 3. Construct the full string
    // Try WebP first (optimized format), fallback to PNG
    const basePath = `${folderPath}bbarn-teaser-bg${paddedNumber}`;

    // Test if WebP is supported, otherwise use PNG
    // For now, default to PNG since you haven't converted yet
    // TODO: Convert intro PNG files to WebP for 60-70% size reduction
    return `${basePath}.webp`;
  };

  // Helper to draw image cover (like object-fit: cover)
  const drawImageScaled = (img, ctx) => {
    if (!img) return;
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  // 1. PROGRESSIVE IMAGE LOADING
  useEffect(() => {
    const loadImages = async () => {
      // Load first 30 frames eagerly, rest on demand
      const eagerCount = 30;
      const promises = [];

      for (let i = 0; i < eagerCount; i++) {
        promises.push(
          new Promise((resolve) => {
            const img = new Image();
            img.src = getPath(i);
            img.onload = () => resolve({ index: i, img });
            img.onerror = () => resolve({ index: i, img: null });
          })
        );
      }

      const eagerImages = await Promise.all(promises);
      const imageMap = new Array(frameCount).fill(null);

      eagerImages.forEach(({ index, img }) => {
        if (img) imageMap[index] = img;
      });

      setImages(imageMap);
      setIsLoaded(true);

      // Draw first frame immediately
      if (canvasRef.current && imageMap[0]) {
        const ctx = canvasRef.current.getContext('2d');
        drawImageScaled(imageMap[0], ctx);
      }
    };

    loadImages();
  }, []);

  // 2. LAZY LOAD REMAINING FRAMES ON DEMAND
  useEffect(() => {
    if (!isLoaded) return;

    const frameIndex = Math.floor(introProgress * (frameCount - 1));
    const preloadWindow = 10; // Preload 10 frames ahead

    // Check if we need to load frames ahead of current progress
    for (let i = frameIndex; i < Math.min(frameIndex + preloadWindow, frameCount); i++) {
      if (!images[i]) {
        // Load this frame in the background
        const img = new Image();
        img.src = getPath(i);
        img.onload = () => {
          setImages(prev => {
            const updated = [...prev];
            updated[i] = img;
            return updated;
          });
        };
      }
    }
  }, [introProgress, isLoaded, frameCount]);

  // 3. DRAW CURRENT FRAME
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const frameIndex = Math.floor(introProgress * (frameCount - 1));
    const canvas = canvasRef.current;

    if (canvas && images[frameIndex]) {
      const ctx = canvas.getContext('2d');
      drawImageScaled(images[frameIndex], ctx);
    }
  }, [introProgress, isLoaded, images, frameCount]);

  // 4. CANVAS RESIZE HANDLING
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full object-cover z-50 pointer-events-none"
    />
  );
}