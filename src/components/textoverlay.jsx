import React, { useEffect, useState } from 'react';

export default function TextOverlay() {
  const [clipTop, setClipTop] = useState(10000); // Start hidden (high value)

  useEffect(() => {
    const handleScroll = () => {
      const track = document.getElementById('rotation-track');
        if(!track) return;

        const box =track.getBoundingClientRect();
        let edge = box.bottom + 105;
        if(edge<0) edge=0;
        if(edge > window.innerHeight)edge = window.innerHeight;

      // 2. Update the Clip Path
      // We clip everything ABOVE that edge.
      setClipTop(edge);
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
        <h1 className="text-[8rem] font-helvetica tracking-[-0.04em] font-bold leading-none text-white">
          The Bbarn.
        </h1>
        <div className="flex flex-row justify-between w-full ">
        <p className="text-2xl text-gray-200  mx-1">The Best</p>
        <p className="text-2xl text-gray-200  mx-1">there is.</p>
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
        <h1 className="text-[8rem] font-helvetica tracking-[-0.04em] font-bold leading-none text-red-600">
          The Bbarn.
        </h1>
        <div className="flex flex-row justify-between w-full">
        <p className="text-2xl text-red-300 mx-1">The Best</p>
        <p className="text-2xl text-red-300 mx-1"> there is.</p>
        </div>
        </div>
       
      </div>
    </>
  );
}