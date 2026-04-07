import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const projects = [
  {
    title: "Media & Editing",
    role: "Content Shoots and Post Production",
    img: "design-images/content.jpg",
    col: "col-span-12 md:col-span-6 md:col-start-1",
    url: "https://photographymanas.myportfolio.com"
  },
  {
    title: "Design",
    role: "Design & Illustrations",
    img: "design-images/design.jpg",
    col: "col-span-12 md:col-span-6 md:col-start-7 mt-12 md:mt-32",
    url: "https://graphicdesignmanas.myportfolio.com"
  },
  {
    title: "The Bbarn Collection",
    role: "Our Creative Collaborations",
    img: "design-images/bbarn.jpeg",
    col: "col-span-12 md:col-span-8 md:col-start-3 mt-12 md:mt-48",
    url: "https://www.instagram.com/bbarn.in/"
  },
];

export default function Portfolio() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  // Custom cursor tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement via spring
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update motion values purely off client coordinates
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-[100vh] w-full bg-black text-white pt-32 pb-64 overflow-hidden">

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full text-center mb-32"
      >
        <h2 className="text-4xl md:text-5xl font-light tracking-widest uppercase">Projects</h2>
      </motion.div>

      {/* Asymmetrical Grid */}
      <div className="container mx-auto px-6 md:px-16 grid grid-cols-12 gap-y-16 gap-x-4 md:gap-x-8 cursor-none">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${project.col} flex flex-col justify-start items-center text-center border-b border-white/20 pb-8 group`}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={() => setModal({ active: true, index })}
            onMouseLeave={() => setModal({ active: false, index })}
          >
            <h3 className="text-[3rem] md:text-[5rem] lg:text-[7rem] font-bold font-helvetica uppercase leading-[0.9] tracking-tighter group-hover:text-gray-400 group-hover:-translate-x-4 transition-all duration-500 ease-out">
              {project.title}
            </h3>
            <p className="mt-4 text-xl font-light text-gray-400 group-hover:text-white transition-colors">
              {project.role}
            </p>
          </motion.a>
        ))}
      </div>

      {/* Mouse Floating Modal Reveal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center cursor-none"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="w-[300px] h-[220px] md:w-[400px] md:h-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden relative pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: modal.active ? 1 : 0,
            opacity: modal.active ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* The sliding track holding the images */}
          <motion.div
            className="absolute top-0 left-0 w-full"
            // We move the track up based on the active index
            animate={{ top: `-${modal.index * 100}%` }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {projects.map((proj, i) => (
              <div key={i} className="w-full h-[220px] md:h-[300px] flex justify-center items-center overflow-hidden bg-black">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Optional "VIEW" text cursor overlay */}
        <motion.div
          className="absolute rounded-full w-20 h-20 bg-black text-white flex items-center justify-center font-bold text-xs pointer-events-none -translate-x-1/2 -translate-y-1/2 mixes-blend-difference"
          initial={{ scale: 0 }}
          animate={{ scale: modal.active ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          VIEW
        </motion.div>
      </motion.div>

    </div>
  );
}
