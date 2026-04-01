import React from 'react';
import { useScrollProgress } from '../helpers/ScrollManager';

// --- CONFIGURATION ---
const WORDS_DATA = [
  { text: "Branding", x: "12%", y: "18%" },
  { text: "Content Shoots", x: "72%", y: "65%" },
  { text: "Editing", x: "8%", y: "48%" },
  { text: "Animations", x: "5%", y: "78%" },
  { text: "Motion Graphics", x: "63%", y: "87%" },
  { text: "Illustrations", x: "70%", y: "42%" },
  { text: "Design", x: "83%", y: "16%" },
  { text: "Customs", x: "23%", y: "68%" },

];

export default function FlyingComp() {
  // Use scroll progress from our context/helper
  const { flyingProgress } = useScrollProgress();

  return (
    <div style={containerStyle}>
      {WORDS_DATA.map((word, i) => {
        // Calculate threshold for each word to spread them out evenly during the scroll.
        // Elements will appear roughly between 10% and 90% of the flying section scroll.
        const threshold = (i + 1) / (WORDS_DATA.length + 2);
        const isVisible = flyingProgress > threshold;

        return (
          <span
            key={i}
            className={isVisible ? 'fly-word fly-word--visible' : 'fly-word'}
            style={{
              left: word.x,
              top: word.y,
            }}
          >
            {word.text}
          </span>
        );
      })}

      {/* Scoped styles */}
      <style>{cssRules}</style>
    </div>
  );
}

// --- STYLES ---

const containerStyle = {
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 0,
};

const cssRules = `
  .fly-word {
    position: absolute;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: clamp(1.1rem, 2.4vw, 2.6rem);
    font-weight: 500;
    color: #000;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;

    /* Initial hidden state */
    opacity: 0;
    filter: blur(12px);
    transform: translateY(28px);

    /* Transition handles the animation automatically when class changes */
    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                filter 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, filter, transform;
  }

  .fly-word--visible {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0px);
  }
`;