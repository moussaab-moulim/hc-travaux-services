import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { TextSlice } from '.slicemachine/prismicio';
import { LinesBackground } from '@components/atoms/Background';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { clsx } from '@utils/common';

const Text = ({ slice }: SliceComponentProps<TextSlice>) => {
  return (
    <section
      id={slice.primary.slice_id ?? undefined}
      className={clsx('general-text-section relative py-24 bg-light ')}
    >
      <LinesBackground />
      <SectionInnerContainer className="max-w-screen-sm">
        <div className="flex flex-wrap">
          <div
            className={clsx(
              'text-center inner-box ',
              '[&>h2]:font-extrabold [&>h2]:text-xl md:[&>h2]:text-2xl',
              '[&>h3]:text-lg md:[&>h3]:text-xl',
              ' marker:text-white  [&>ul]:leading-relaxed [&>ul]:px-4',
              '[&>h2]:py-5 [&>h3]:pt-5 [&>h3]:px-3 [&>p]:pb-5 [&>p]:text-base [&>p]:font-normal'
            )}
          >
            <PrismicRichText field={slice.primary.text} />
          </div>
        </div>
      </SectionInnerContainer>
    </section>
  );
};

export default Text;
