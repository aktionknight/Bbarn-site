'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './style.module.scss';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  // 1. Add state to track if the mouse is moving
  const [isMoving, setIsMoving] = useState(false);
  const timeoutRef = useRef(null);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const smoothOptions = { damping: 20, stiffness: 200, mass: 0.5 }
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  }

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    
    // 2. Pass EXACT coordinates (No more math here)
    mouse.x.set(clientX);
    mouse.y.set(clientY);

    // 3. Set moving to true
    setIsMoving(true);

    // 4. Reset the timer every time the mouse moves
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // If the mouse doesn't move for 100ms, we assume it stopped
    timeoutRef.current = setTimeout(() => {
      setIsMoving(false);
    }, 100);
  }

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [])

  // 5. Define your sizes
  const staticSize = 10;
  const movingSize = 22;

  return (
    <div className={styles.cursorContainer}>
      <motion.div 
        style={{
          left: smoothMouse.x, 
          top: smoothMouse.y,
          // 6. Center the cursor dynamically using CSS transforms
          x: "-50%",
          y: "-50%",
          // Ensuring basic visibility properties are here just in case SCSS fails
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          backgroundColor: 'white',
          mixBlendMode: 'difference'
        }} 
        // 7. Animate the width and height based on the 'isMoving' state
        animate={{
          width: isMoving ? movingSize : staticSize,
          height: isMoving ? movingSize : staticSize,
        }}
        // Optional: Tweak the spring animation for the resize effect
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25
        }}
        className={styles.cursor}
      />
    </div>
  )
}