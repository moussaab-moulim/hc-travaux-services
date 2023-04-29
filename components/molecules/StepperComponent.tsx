import React, { Fragment, ReactElement } from 'react';

import { clsx } from '@utils/common';
interface IStepper {
  steps: {
    icon: ReactElement;
    name: string;
  }[];
  activeStep: number;
}
export const StepperComponent = ({ steps, activeStep }: IStepper) => {
  return (
    <div className="p-4 w-full mb-6 sm:mb-10 lg:mb-20">
      <div className="flex items-center">
        {steps.map((_step, _index) => {
          return (
            <Fragment key={_index}>
              <div
                className={clsx(
                  'flex items-center relative',
                  _index + 1 < activeStep && 'text-primary',
                  _index + 1 === activeStep && 'text-white',
                  _index + 1 > activeStep && 'text-gray'
                )}
              >
                <div
                  className={clsx(
                    'rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-solid border-2',
                    _index + 1 < activeStep && 'border-primary',
                    _index + 1 === activeStep && 'bg-primary border-primary',
                    _index + 1 > activeStep && 'border-gray'
                  )}
                >
                  {_step.icon}
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-text hidden sm:block ">
                  {_step.name}
                </div>
              </div>
              <div
                className={clsx(
                  _index + 1 >= steps.length && 'hidden',
                  'flex-auto border-solid border-0 border-t-2 transition duration-500 ease-in-out',
                  _index + 1 < activeStep && 'border-primary',
                  _index + 1 >= activeStep && 'border-gray'
                )}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
