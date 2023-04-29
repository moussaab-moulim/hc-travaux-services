import React, { Fragment } from 'react';
import { FC } from 'react';

import { IGeneralComponentProps } from 'types/common';

interface IDateFormatter {
  publishDate: string;
}
export const DateFormatter: FC<IGeneralComponentProps<IDateFormatter>> = ({
  publishDate,
}) => {
  const pubDate = new Date(publishDate);
  const firstPubDate = new Intl.DateTimeFormat('fr-fr', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(pubDate);
  return <Fragment>{firstPubDate}</Fragment>;
};
