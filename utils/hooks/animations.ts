import { useEffect } from 'react';

import { useAnimation } from 'framer-motion';

export const useAnimateInView = (inView: boolean) => {
  const animation = useAnimation();
  // const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      animation.start(motionParams.animate);
    } else {
      animation.start(motionParams.initial);
    }

    return () => {
      animation.stop();
    };
  }, [inView, animation]);

  return animation;
};

export const fadeIn = (direction = 'up') => {
  return {
    initial: { y: direction === 'up' ? 40 : -60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 3,
        type: 'spring',
        bounce: 0.3,
      },
    },
  };
};

export const fadeInUp = () => fadeIn('up');
export const fadeInDown = () => fadeIn('down');

export const zoom = (direction = 'in') => {
  return {
    initial: { scale: direction === 'in' ? 1 : 1.1, opacity: 0 },
    animate: {
      scale: direction === 'in' ? 1.1 : 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };
};
export const zoomIn = () => zoom('in');
export const zoomOut = () => zoom('out');

export const stagerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.7,
    },
  },
};

export const motionParams = {
  initial: 'initial',
  animate: 'animate',
};
