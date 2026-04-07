import { motion } from 'framer-motion';

function PerspectiveText({ label }) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full group/perspective transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] hover:rotate-x-[90deg] transform-style-3d">
      <p className="transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none uppercase absolute origin-bottom group-hover/perspective:-translate-y-full group-hover/perspective:opacity-0 group-hover/perspective:rotate-x-90">
        {label}
      </p>
      <p className="transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none uppercase absolute origin-top transform translate-y-full rotate-x-[-90deg] group-hover/perspective:translate-y-0 group-hover/perspective:rotate-x-0 group-hover/perspective:opacity-1 opacity-0">
        {label}
      </p>
    </div>
  );
}

export default function Button({ isActive, toggleMenu }) {
  return (
    <div className="relative w-[100px] h-[40px] rounded-[25px] cursor-none overflow-hidden z-20">
      <motion.div
        className="relative w-full h-full"
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="w-full h-full bg-black text-white hover:bg-neutral-800 transition-colors duration-300"
          onClick={() => { toggleMenu(); }}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div
          className="absolute top-full text-black hover:bg-neutral-200 w-full h-full bg-white transition-colors duration-300"
          onClick={() => { toggleMenu(); }}
        >
          <PerspectiveText label="Close" />
        </div>
      </motion.div>
    </div>
  );
}
