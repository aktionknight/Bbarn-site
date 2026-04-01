export const menuScroll = {
  open: {
    width: "480px",
    height: "650px",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
  }
};

export const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0 }
};

export const slideLeft = {
  initial: { opacity: 0, x: -20, y: 80, rotateX: 90 },
  enter: (i) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + (i * 0.1),
      ease: [0.215, 0.61, 0.355, 1],
    }
  }),
  exit: {
    opacity: 0,
    x: -20,
    y: 80,
    rotateX: 90,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
  }
};

export const slideIn = {
  initial: { opacity: 0, y: 20 },
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.5 + (i * 0.1),
      ease: [0.215, 0.61, 0.355, 1],
    }
  }),
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
  }
};
