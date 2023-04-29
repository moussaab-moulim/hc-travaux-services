import React, { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { TextareaHTMLAttributes } from 'react';

import { ControllerRenderProps } from 'react-hook-form';

import { clsx } from '@utils/common';
import { IGeneralComponentProps } from 'types/common';
interface ITextFieldBase {
  field: ControllerRenderProps<any, any>;
}

interface IInputTextField extends ITextFieldBase {
  type: HTMLInputTypeAttribute;
  multiline?: never;
}

interface ITextareaTextField extends ITextFieldBase {
  type?: never;
  multiline: boolean;
}
type ITextField = ITextareaTextField | IInputTextField;

export const TextField: FC<
  IGeneralComponentProps<
    ITextField,
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>
  >
> = ({ className, placeholder, field, type = 'text', multiline }) => {
  const customClass = `relative resize-none block w-full leading-7 px-5 py-3 text-text h-16 text-base  font-normal rounded-none placeholder-gray border-solid border border-gray font-raleway transition-all duration-300 ease-ease overflow-visible bg-white hover:bg-light ${className}`;
  return multiline ? (
    <textarea
      className={clsx(customClass, 'h-auto')}
      placeholder={placeholder}
      {...field}
      rows={5}
    />
  ) : (
    <input
      type={type}
      placeholder={placeholder}
      className={customClass}
      {...field}
    />
  );
};
