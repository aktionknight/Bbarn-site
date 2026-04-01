import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Lazy Instagram embed component
const InstagramEmbedLazy = ({ url }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isLoaded) return;

    // Load Instagram embed script only when needed
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
      setIsLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isVisible, isLoaded]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {isVisible ? (
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      )}
    </div>
  );
};

// --- 1. THE BASIC CARD UI ---
const VideoCard = ({ title, category, children }) => {
  return (
    <div className="relative shrink-0 h-full w-full md:w-[328px] md:h-[400px] scale-4 rounded-2xl overflow-hidden bg-zinc-800 shadow-2xl group">
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="w-full h-full overflow-hidden">
          {children}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-20">
        <h3 className="text-2xl font-bold font-bbarn text-white">{title}</h3>
        <p className="text-sm text-gray-300 uppercase tracking-widest">{category}</p>
      </div>
    </div>
  );
};

// --- 2. THE ANIMATION WRAPPER (Handles Individual Fly-In) ---
const ParallaxCard = ({ children, progress, index }) => {
  // STAGGER LOGIC:
  // Each card starts 0.05 units later than the previous one.
  // Index 0 starts at 0.00
  // Index 1 starts at 0.05
  // Index 2 starts at 0.10...
  const start = index * 0.05;
  const end = start + 0.15; // Animation lasts for 0.15 units of scroll

  const y = useTransform(progress, [start, end], [400, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div style={{ y, opacity }} className="h-full">
      {children}
    </motion.div>
  );
}


// --- 3. THE MAIN SCENE ---
export default function Demos() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // HORIZONTAL SCROLL FOR TRACK:
  // Continuous scroll from left (-50%) to completely offscreen (150vw)
  const x = useTransform(scrollYProgress, [0, 1], ["-50%", "150vw"]);

  return (
    // Height 700vh ensures the animations feel slow and smooth
    <section ref={targetRef} className="relative w-full h-[700vh] bg-transparent">

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        <div className="w-full pl-10">

          {/* Title also gets a slight animation */}
          <motion.h2
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
            className="text-4xl md:text-6xl font-helvetica tracking-[-0.04em] text-white mb-8"
          >
            Bbarn's Special
          </motion.h2>

          {/* THE HORIZONTAL TRACK */}
          <motion.div style={{ x }} className="flex gap-8 w-max px-4">

            {/* Wrap each card in ParallaxCard and pass the index! */}

            {/* CARD 1 (Index 0) */}
            <ParallaxCard progress={scrollYProgress} index={3}>
              <VideoCard title="InYourDistrict" category="Reel">
                <InstagramEmbedLazy url="https://www.instagram.com/p/DNh3Nuyz0AN/" />
              </VideoCard>
            </ParallaxCard>

            {/* CARD 2 (Index 1) */}
            <ParallaxCard progress={scrollYProgress} index={2}>
              <VideoCard title="Campaign 02" category="Teaser">
                <InstagramEmbedLazy url="https://www.instagram.com/p/DHWMBqWiB4X/" />

              </VideoCard>
            </ParallaxCard>

            {/* CARD 3 (Index 2) */}
            <ParallaxCard progress={scrollYProgress} index={1}>
              <VideoCard title="Launch Event" category="Story">
                <InstagramEmbedLazy url="https://www.instagram.com/p/DM2i0TAzaFj/" />
              </VideoCard>
            </ParallaxCard>

            {/* CARD 4 (Index 3) */}
            <ParallaxCard progress={scrollYProgress} index={0}>
              <VideoCard title="Behind Scenes" category="BTS">
                <InstagramEmbedLazy url="https://www.instagram.com/p/DKZ2Buqit_Y/" />


              </VideoCard>
            </ParallaxCard>

          </motion.div>

        </div>
      </div>

    </section>
  );
}