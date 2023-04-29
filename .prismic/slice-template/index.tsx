// @ts-nocheck
import React from 'react';

import { SliceComponentProps } from '@prismicio/react';

import { {{componentName}}Slice } from '.slicemachine/prismicio';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { SectionTitle } from '@components/molecules/SectionTitle';


/**
 * 
 * 
 * delete // @ts-nocheck
 * as well as this comment
 * 
 * 
 */

const {{componentName}} = ({ slice }: SliceComponentProps<{{componentName}}Slice>) => {
  return (
    <section
      id={slice.primary.slice_id}
      className={`gallery-section relative pt-16 px-0 pb-12 sm:pt-28  lg:pt-40 lg:pb-36 bg-[${
        slice?.primary?.background_color ?? '#FFFFFF'
      }]`}
    >
      <SectionInnerContainer>
        <SectionTitle
          heading={slice.primary.title}
          text={slice.primary.description}
        />
      </SectionInnerContainer>
    </section>
  );
};


export default {{componentName}}