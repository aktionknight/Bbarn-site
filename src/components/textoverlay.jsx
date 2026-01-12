import React, { useEffect, useState } from 'react';

export default function TextOverlay() {
  const [clipTop, setClipTop] = useState(10000); // Start hidden (high value)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // 1. Where is the White Section?
      // It starts after the 200vh spacer.
      // So its Top Edge position relative to the screen is:
      // (Spacer Height) - (Amount Scrolled)
      const whiteSectionEdge = (window.innerHeight*4.552) - scrollY;

      // 2. Update the Clip Path
      // We clip everything ABOVE that edge.
      setClipTop(whiteSectionEdge);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* LAYER 1: The White Text (Always visible behind) */}
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none z-1 mt-[-15vh]">
        <div className="flex flex-col items-center w-fit">
        <h1 className="text-[8rem] font-bbarn font-bold leading-none text-white">
          The Bbarn.
        </h1>
        <div className="flex flex-row justify-between w-full ">
        <p className="text-2xl text-gray-200">The Best</p>
        <p className="text-2xl text-gray-200">there is.</p>
        </div>
        </div>
      </div>

      {/* LAYER 2: The Color Text (Clipped) */}
      {/* z-50 puts it on top. */}
      {/* style={{ clipPath: ... }} dynamically cuts this layer */}
      <div 
        className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none  mt-[-15vh]"
        style={{ 
            // "inset(Top Right Bottom Left)"
            // We cut the top based on the scroll position.
            clipPath: `inset(${clipTop}px 0 0 0)` 
        }}
      >
        {/* You can make this ANY color. Let's do Red for effect. */}
        <div className="flex flex-col items-center w-fit">
        <h1 className="text-[8rem] font-bbarn font-bold leading-none text-red-600">
          The Bbarn.
        </h1>
        <div className="flex flex-row justify-between w-full">
        <p className="text-2xl text-red-300">The Best</p>
        <p className="text-2xl text-red-300"> there is.</p>
        </div>
        </div>
       
      </div>
    </>
  );
}