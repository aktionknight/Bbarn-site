import React, { useEffect, useRef } from 'react';

const BackgroundWave = ({ color = "rgba(255, 255, 255, 0.05)", className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let width, height;
    let animationFrameId;

    // Smooth mouse coordinates
    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create 6 individual, strictly non-intersecting floating topographic blobs
    const blobs = [
      { x: 0.1, y: 0.2, baseRadius: 180, speed: 0.0002, amplitude: 50, offset: 0 },
      { x: 0.3, y: 0.45, baseRadius: 120, speed: 0.0002, amplitude: 50, offset: 0 },
      { x: 0.5, y: 0.1, baseRadius: 150, speed: 0.0003, amplitude: 40, offset: 100 },
      { x: 0.9, y: 0.2, baseRadius: 200, speed: 0.0001, amplitude: 60, offset: 200 },
      { x: 0.1, y: 0.8, baseRadius: 160, speed: 0.0004, amplitude: 45, offset: 300 },
      { x: 0.5, y: 0.9, baseRadius: 190, speed: 0.0002, amplitude: 55, offset: 400 },
      { x: 0.8, y: 0.8, baseRadius: 170, speed: 0.0003, amplitude: 45, offset: 500 }
    ];

    const render = () => {
      mouse.x += (targetMouse.x - mouse.x) * 0.03;
      mouse.y += (targetMouse.y - mouse.y) * 0.03;

      ctx.clearRect(0, 0, width, height);
      const t = performance.now();

      for (let b = 0; b < blobs.length; b++) {
        const blob = blobs[b];

        // Determine the blob's center (barely moves to prevent collision)
        let cx = width * blob.x + Math.sin(t * 0.0002 + blob.offset) * 15;
        let cy = height * blob.y + Math.cos(t * 0.0003 + blob.offset) * 15;

        // Pull the blob center toward the mouse slightly
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < 600) {
          const pull = Math.pow(1 - distToMouse / 600, 2);
          cx += dx * pull * 0.05;
          cy += dy * pull * 0.05;
        }

        const numRings = 12; // Optimized from 14

        // Hoist invariant time calculations outside the inner loops
        const t0 = t * blob.speed;
        const t1 = -t * blob.speed * 0.8;
        const t2 = t * blob.speed * 1.2;
        const t3 = t * blob.speed * 1.5;

        for (let ring = 1; ring <= numRings; ring++) {
          const ringScale = ring * 0.10; // Pack lines tightly
          const baseR = blob.baseRadius * ringScale;
          const amp = blob.amplitude * ringScale;

          ctx.beginPath();
          const numPoints = 80; // Dramatically reduced from 180 for performance
          const angleStep = (Math.PI * 2) / numPoints;

          for (let i = 0; i <= numPoints; i++) {
            const a = i * angleStep;

            // Generate Topographic organic radius
            const r = baseR
              + Math.sin(a * 2 + t0) * amp
              + Math.cos(a * 4 + t1) * (amp * 0.4)
              + Math.sin(a * 7 + t2) * (amp * 0.15)
              + Math.cos(a * 11 + t3) * (amp * 0.05);

            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.closePath();
          ctx.strokeStyle = color;
          // Randomize the stroke thickness for each layer deterministically (avoids flickering)
          ctx.lineWidth = 0.5 + Math.abs(Math.sin(b * 31 + ring * 17)) * 2.0;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default BackgroundWave;
