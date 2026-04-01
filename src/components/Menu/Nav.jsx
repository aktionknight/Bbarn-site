import { motion } from 'framer-motion';
import { slideLeft, slideIn } from './anim';

export const links = [
  { title: "Placeholder 1", href: "#" },
  { title: "Placeholder 2", href: "#" },
  { title: "Placeholder 3", href: "#" },
  { title: "Placeholder 4", href: "#" },
  { title: "Placeholder 5", href: "#" }
];

export const footerLinks = [
  { title: "Instagram", href: "#" },
  { title: "Twitter", href: "#" },
  { title: "LinkedIn", href: "#" }
];

export default function Nav() {
  return (
    <div className="h-full pt-[100px] px-10 pb-12 flex flex-col justify-between box-border">
      <div className="flex flex-col gap-3">
        {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`} className="perspective-[120px] perspective-origin-bottom">
              <motion.div
                custom={i}
                variants={slideLeft}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <a 
                  href={href} 
                  className="text-white text-5xl font-helvetica tracking-[-0.04em] font-light no-underline hover:text-gray-400 transition-colors duration-300"
                >
                  {title}
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>

      <motion.div className="flex gap-10 mt-auto">
        {footerLinks.map((link, i) => {
          const { title, href } = link;
          return (
            <motion.a
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={`f_${i}`}
              href={href}
              className="text-gray-400 text-sm font-helvetica hover:text-white transition-colors duration-300 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              {title}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
