import React, { ElementType } from 'react';
import { HtmlHTMLAttributes } from 'react';
import { FC } from 'react';
import { useMemo } from 'react';

import { clsx } from '@utils/common';
import { IGeneralComponentProps } from 'types/common';

type IHeading = {
  as: ElementType;
};
export const Heading: FC<
  IGeneralComponentProps<IHeading, HtmlHTMLAttributes<HTMLHeadingElement>>
> = ({ as: Hn = 'h2', children, className }) => {
  const sizes = useMemo(() => {
    switch (Hn) {
      case 'h1':
        return 'text-5xl md:text-6xl lg:text-7xl font-light uppercase ';
      case 'h2':
        return 'text-4xl md:text-5xl lg:text-6xl font-light uppercase ';
      case 'h3':
        return 'text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase ';
      case 'h4':
        return 'text-lg md:text-2xl lg:text-3xl font-black uppercase ';
      case 'h5':
        return 'text-base md:text-xl lg:text-2xl font-extrabold uppercase ';
      case 'h6':
        return 'text-sm md:text-base lg:text-lg font-medium capitalize ';
      default:
        return 'text-6xl';
    }
  }, [Hn]);
  return (
    <Hn
      className={clsx(
        'tracking-normal font-raleway text-text',
        sizes,
        className ?? ''
      )}
    >
      {children}
    </Hn>
  );
};
