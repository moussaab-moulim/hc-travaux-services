import React, { FC } from 'react';

import { clsx } from '@utils/common';
import { IGeneralComponentProps } from 'types/common';

export const FieldContainer: FC<IGeneralComponentProps> = ({
  className,
  children,
}) => (
  <div className={clsx('w-full mb-5 px-2', className ?? '')}>{children}</div>
);
