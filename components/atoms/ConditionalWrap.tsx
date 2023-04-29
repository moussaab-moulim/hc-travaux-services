import React, { Fragment, PropsWithChildren } from 'react';
import { FC } from 'react';

import { IGeneralComponentProps } from 'types/common';

interface IConditionalWrap {
  condition: boolean;
  wrap: FC<PropsWithChildren<IGeneralComponentProps>>;
  antiWrap?: FC<PropsWithChildren<IGeneralComponentProps>>;
}
export const ConditionalWrap: FC<IGeneralComponentProps<IConditionalWrap>> = ({
  condition,
  wrap: Wrap,
  antiWrap: AntiWrap,
  children,
  className,
}) => {
  return condition ? (
    <Wrap className={className}>{children}</Wrap>
  ) : AntiWrap ? (
    <AntiWrap className={className}>{children}</AntiWrap>
  ) : (
    <Fragment>{children}</Fragment>
  );
};
