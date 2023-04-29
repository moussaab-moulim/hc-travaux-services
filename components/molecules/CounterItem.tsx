import React, { FC, useEffect, useRef } from 'react';

import { animate, motion } from 'framer-motion';

import { IGeneralComponentProps } from 'types/common';

interface ICounterItem {
  count: number;
  label?: string;
  parentColumnsCount: number;
  isInView: boolean;
}
export const CounterItem: FC<IGeneralComponentProps<ICounterItem>> = ({
  count,
  isInView,
  label,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (isInView) {
      const controls = animate(0, count, {
        duration: 1,
        onUpdate(value) {
          node.textContent = value.toFixed(0);
        },
      });

      return () => controls.stop();
    }
    return undefined;
  }, [isInView, count]);

  return (
    <motion.div
      className={`counter-column column  flex basis-full flex-col p-[10px] md:basis-1/4 lg:basis-1/4 `}
    >
      <div className="inner relative ">
        <div className="content relative text-center ">
          <div className="count-outer count-box font-raleway text-dark font-light relative  text-4xl md:text-5xl lg:text-6xl ">
            <span className="count-text " ref={ref}>
              0
            </span>
          </div>
          {label && (
            <div className="counter-title relative text-sm font-normal text-text font-raleway opacity-50 p-5">
              {label}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
