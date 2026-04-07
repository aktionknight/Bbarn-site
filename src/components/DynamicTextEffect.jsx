import React from 'react';
import { useScrollProgress } from '../helpers/ScrollManager';

export default function DynamicTextEffect() {
  const { rotationProgress } = useScrollProgress();

  // We want the text to split/wrap around the models.
  // The max gap will be when the models are fully rotated/presented.
  const gapSize = rotationProgress * 50; // vw

  const baseLeft = 'The Bbarn is a creative powerhouse, Led by a Media Artist & a designer across all creative fields. The Bbarn\'\s vision of Propelling art through collaborations aims to deliver state-of-the-art services and in house creative projects, rooted in culture and inherently solitary artworks.';

  const baseRight = 'Explore the web experience of The Bbarn, from highlight projects to the creative process. Use the Menu to navigate the through The Bbarn. Explore our creative projects or Book a service. Welcome to The Bbarn. Est 2024, The best there is.';

  // Calculate visible characters based on progress
  // Since rotationProgress is between 0 and 1, we multiply by string length + some offset
  // We double the progress mapping so it types out before the rotation completely finishes
  const typeProgress = Math.min(1, rotationProgress * 1.2);
  const leftChars = Math.floor(typeProgress * baseLeft.length);
  const rightChars = Math.floor(typeProgress * baseRight.length);

  const displayLeft = baseLeft.substring(0, leftChars);
  const displayRight = baseRight.substring(0, rightChars);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none flex items-center justify-between z-0 px-8 md:px-24"
      style={{ opacity: rotationProgress > 0 && rotationProgress < 1.1 ? 1 : 0 }}>

      {/* Left Bounding Box */}
      <div className="w-[80vw] md:w-[25vw] mt-[10vw] max-w-md text-right flex flex-col justify-center translate-y-12">
        <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
          {displayLeft}
        </p>
      </div>

      {/* Right Bounding Box */}
      <div className="w-[80vw] md:w-[25vw] mt-[10vw]  max-w-md text-left flex flex-col justify-center translate-y-12">
        <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
          {displayRight}
        </p>
      </div>

    </div>
  );
}
