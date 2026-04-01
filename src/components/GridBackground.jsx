import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GridBackground() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // We need 5 columns
  const cols = 5;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <div className="sticky top-0 w-full h-screen flex overflow-hidden">
        {[...Array(cols)].map((_, i) => {
          // Staggering the animation based on scroll progress (Reversed: right to left)
          // Adjust these thresholds depending on how soon you want them to fly in
          const start = 0.1 + ((cols - 1 - i) * 0.05);
          const end = start + 0.2;

          // Fly in from bottom (100% to 0%)
          const y = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

          return (
            <div key={i} className="relative flex-1 h-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat"
                style={{
                  y,
                  backgroundImage: "url('/grid.jpeg')",
                  // Position the background so each column shows its respective part of the image
                  // Since there are 5 columns, each is 20% wide. 
                  // 0%, 25%, 50%, 75%, 100% background position X
                  backgroundPosition: `${(i / (cols - 1)) * 100}% center`,
                  // To maintain the image aspect ratio across columns, 
                  // background size must be 500% width, 100% height
                  backgroundSize: `${cols * 100}% 100%`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
