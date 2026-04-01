import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuScroll } from './anim';
import Button from './Button';
import Nav from './Nav';

export default function Menu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative">
      <motion.div 
        className="absolute top-0 right-0 h-[650px] w-[480px] bg-[#1a1a1a] rounded-[25px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10 block pointer-events-auto origin-top-right transition-colors"
        variants={menuScroll}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && <Nav />}
        </AnimatePresence>
      </motion.div>
      <Button isActive={isActive} toggleMenu={() => { setIsActive(!isActive) }} />
    </div>
  );
}
