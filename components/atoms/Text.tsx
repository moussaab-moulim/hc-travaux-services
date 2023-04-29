import React, { FC } from 'react';

import { IGeneralComponentProps } from 'types/common';

export const Text: FC<IGeneralComponentProps> = ({ children }) => {
  return (
    <p className="text relative text-white opacity-50 text-sm font-normal mt-5 font-raleway">
      {children}
    </p>
  );
};
