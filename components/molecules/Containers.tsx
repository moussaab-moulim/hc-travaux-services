import React, { ElementType, FC } from 'react';

import { clsx } from '@utils/common';

import { IGeneralComponentProps } from '../../types/common';

type ISectionInnerContainer = IGeneralComponentProps & {
  as?: ElementType;
};

export const SectionInnerContainer: FC<ISectionInnerContainer> = ({
  as: Comp = 'div',
  className,
  children,
}) => {
  return (
    <Comp
      className={clsx(
        'relative my-0 mx-auto max-w-5xl px-3.5 py-0',
        className ?? ''
      )}
    >
      {children}
    </Comp>
  );
};
