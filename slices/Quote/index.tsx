import { Fragment } from 'react';

import { isFilled } from '@prismicio/helpers';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

import { QuoteSlice } from '.slicemachine/prismicio';
import { PrismicButton } from '@components/atoms/CustomButtons';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { SectionTitle } from '@components/molecules/SectionTitle';

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text text-center relative font-raleway text-sm sm:text-base lg:text-xl text-white/50 leading-7">
      {children}
    </p>
  ),
};

const Quote = ({ slice }: SliceComponentProps<QuoteSlice>) => {
  return (
    <section
      id={slice.primary.slice_id ?? undefined}
      className={`testimonial-section bg-[${
        slice?.primary?.background_color ?? '#FFFFFF'
      }] py-32`}
    >
      <SectionInnerContainer>
        <SectionTitle heading={slice.primary.title} />
        <div className="inner-container p-0 lg:py-0 lg:px-28 relative">
          <FaQuoteLeft
            className="absolute left-0 -top-14"
            size={70}
            color="rgba(255,255,255,0.07)"
          />
          <FaQuoteRight
            className="absolute right-0 -bottom-14"
            size={70}
            color="rgba(255,255,255,0.07)"
          />

          {isFilled.richText(slice.primary.quote) && (
            <div className="testimonial-block relative">
              <div className="inner-box relative text-center">
                <PrismicRichText
                  field={slice.primary.quote}
                  components={components}
                />
              </div>
            </div>
          )}
        </div>
        {slice.items.length > 0 && (
          <div
            className={`w-full px-4 mt-20 flex basis-full flex-wrap justify-center gap-3`}
          >
            {slice.items.map((_item, index) =>
              isFilled.link(_item.buttonlink) ? (
                <PrismicButton
                  key={index}
                  field={_item.buttonlink}
                  text={_item.buttonlabel}
                />
              ) : (
                <Fragment key={index} />
              )
            )}
          </div>
        )}
      </SectionInnerContainer>
    </section>
  );
};

export default Quote;
