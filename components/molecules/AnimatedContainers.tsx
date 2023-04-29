interface IAnimatedContainer {
  as?: ElementType;
  setInView?: Dispatch<SetStateAction<boolean>>;
}
import { ElementType, Dispatch, SetStateAction, FC, useEffect } from 'react';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { IGeneralComponentProps } from '../../types/common';
import {
  useAnimateInView,
  fadeInDown,
  motionParams,
} from '../../utils/hooks/animations';

export const AnimatedContainer: FC<
  IGeneralComponentProps<IAnimatedContainer>
> = ({ className, children, setInView }) => {
  const { ref, inView } = useInView();
  const animation = useAnimateInView(inView);
  useEffect(() => {
    if (setInView) {
      setInView(inView);
    }
  }, [inView]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        variants={fadeInDown()}
        {...motionParams}
        animate={animation}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};
