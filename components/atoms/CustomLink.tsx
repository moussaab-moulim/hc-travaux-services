import React from 'react';
import { FC } from 'react';

import {
  EmptyLinkField,
  FilledLinkToDocumentField,
  FilledLinkToWebField,
} from '@prismicio/types';
import { FilledLinkToMediaField } from '@prismicio/types';
import Link from 'next/link';

import { prismicLinkResolver } from '@prismicio';
import { IGeneralComponentProps } from 'types/common';

interface ICustomLink {
  link:
    | FilledLinkToWebField
    | FilledLinkToDocumentField
    | FilledLinkToMediaField
    | EmptyLinkField<'Any'>;

  onClick?: () => void;
}
export const CustomLink: FC<IGeneralComponentProps<ICustomLink>> = (props) => {
  const { onClick, link, className, children } = props;

  return (
    <Link
      onClick={onClick}
      href={prismicLinkResolver(link)}
      className={className}
      target={'target' in link ? link.target : undefined}
    >
      {children}
    </Link>
  );
};
