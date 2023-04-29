import React from 'react';
import { useMemo, useState } from 'react';

import { SliceComponentProps } from '@prismicio/react';

import { CounterSlice } from '.slicemachine/prismicio';
import { LinesBackground } from '@components/atoms/Background';
import { AnimatedContainer } from '@components/molecules/AnimatedContainers';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { CounterItem } from '@components/molecules/CounterItem';
import { SectionTitle } from '@components/molecules/SectionTitle';

/*const AnimatedContainer = dynamic(
  () =>
    import('@components/molecules/AnimatedContainers').then(
      (mod) => mod.AnimatedContainer
    ),
  {
    loading: () => <div>Chargement...</div>,
  }
);*/

const Counter = ({ slice }: SliceComponentProps<CounterSlice>) => {
  const parentSize = useMemo(() => slice.items.length, [slice]);
  const [inView, setInView] = useState(false);

  return (
    <section
      className={`counter-section relative bg-[${
        slice?.primary?.background_color ?? '#FFFFFF'
      }]  px-0 pt-14 pb-10 sm:pt-20 sm:pb-16 lg:pt-30 lg:pb-30 bg-white`}
      id={slice.primary.slice_id ?? undefined}
    >
      <LinesBackground />
      <SectionInnerContainer>
        <SectionTitle
          heading={slice.primary.title}
          text={slice.primary.description}
          className=""
        />

        <AnimatedContainer className="fact-counter " setInView={setInView}>
          <div className="flex flex-row flex-wrap ">
            {slice.items.map((item, index) => {
              return (
                <CounterItem
                  count={item.number}
                  label={item.label}
                  key={index}
                  parentColumnsCount={parentSize}
                  isInView={inView}
                />
              );
            })}
          </div>
        </AnimatedContainer>
      </SectionInnerContainer>
    </section>
  );
};

export default Counter;
