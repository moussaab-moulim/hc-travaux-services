import React, { FC, HTMLAttributes } from 'react';

import { isFilled } from '@prismicio/helpers';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import { RichTextField } from '@prismicio/types';

import { clsx } from '@utils/common';
import { IGeneralComponentProps } from 'types/common';

interface ISectionTitle {
  heading: RichTextField;
  text?: RichTextField;
  align?: 'center' | 'left';
}
const richTextComponents: JSXMapSerializer = {
  strong: ({ children }) => <span>{children}</span>,
};

export const SectionTitle: FC<
  IGeneralComponentProps<ISectionTitle, HTMLAttributes<HTMLDivElement>>
> = ({ heading, text, className, align = 'center' }) => {
  return (
    (isFilled.richText(heading) || isFilled.richText(text)) && (
      <div
        className={clsx(
          align === 'center' ? 'text-center' : 'text-left',
          'flex flex-col flex-nowrap relative ',
          '[&>h2]:font-extrabold [&>h2]:text-base [&>h2]:md:text-2xl [&>h2]:lg:text-3xl [&>h2]:flex [&>h2]:flex-col ',
          '[&_em]:text-4xl [&_em]:md:text-5xl [&_em]:text-text [&_em]:not-italic [&_em]:font-light [&_em]:pb-5 [&_em]:pt-0  ',
          //underline
          '[&>h2_*:not(em)]:after:block [&>h2_*:not(em)]:after:w-28 [&>h2_*:not(em)]:after:h-px [&>h2_*:not(em)]:after:absolute',
          ' [&>h2_*:not(em)]:mb-10',
          align === 'center'
            ? ' [&>h2_*:not(em)]:after:left-1/2  [&>h2_*:not(em)]:after:-translate-x-1/2'
            : ' [&>h2_*:not(em)]:after:left-0',
          ' [&>h2_*:not(em)]:after:bg-primary [&>h2_*:not(em)]:after:mt-4 [&>h2_*:not(em)]:after:mb-6',
          'lg:[&>h2_*:not(em)]:after:w-40 lg:[&>h2_*:not(em)]:after:mt-5',

          className ?? ''
        )}
      >
        <PrismicRichText field={heading} components={richTextComponents} />
        {text && <PrismicRichText field={text} />}
      </div>
    )
  );
};
