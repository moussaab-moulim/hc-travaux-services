import React, {
  ButtonHTMLAttributes,
  FC,
  Fragment,
  HTMLAttributes,
  useState,
} from 'react';

import { LinkField } from '@prismicio/types';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

//import ContactPopup from '@components/organisms/Contact/ContactPopUp';
import { PopupFormLoading } from '@components/organisms/Contact/ContactPopUp';
import { clsx } from '@utils/common';
import { FilledLink, IGeneralComponentProps, Nullable } from 'types/common';

import { ConditionalWrap } from './ConditionalWrap';
import { CustomLink } from './CustomLink';

const ContactPopup = dynamic(
  () => import('@components/organisms/Contact/ContactPopUp'),
  {
    loading: () => <PopupFormLoading />,
  }
);
interface IPrismicButton {
  field: LinkField;
  text: Nullable<string>;
  buttonStyle?: 'outline' | 'filled';
}
interface INormalButton {
  buttonStyle?: 'outline' | 'filled';
  disabled?: boolean;
}
interface IPaginationButton {
  url: string;
  disabled?: boolean;
  active?: boolean;
}

export const buttonClassName: HTMLAttributes<any>['className'] = clsx(
  'cursor-pointer inline-block relative font-raleway text-sm px-12 py-4 font-medium uppercase text-primary bg-transparent border border-solid border-primary rounded-full hover:border-primary hover:bg-primary hover:text-white',
  'transition-all ease-ease duration-500',
  'disabled:opacity-50 disabled:cursor-not-allowed'
);
export const buttonClassNameFilled: HTMLAttributes<any>['className'] = clsx(
  '!bg-primary text-white hover:!bg-transparent hover:text-primary'
);

export const PrismicButton: FC<IGeneralComponentProps<IPrismicButton>> = (
  props
) => {
  const [contactOpen, setContactOpen] = useState(false);
  const { field, text, className, buttonStyle = 'outline' } = props;
  const handleButtonClick = () => {
    setContactOpen(true);
  };

  return (
    <Fragment>
      <ConditionalWrap
        condition={
          ('url' in field && field.url.includes('https://action:')) ||
          !('url' in field)
        }
        wrap={({ children }) => (
          <div
            className={`${buttonClassName} ${
              buttonStyle === 'filled' && buttonClassNameFilled
            } ${className}`}
            onClick={handleButtonClick}
          >
            {children}
          </div>
        )}
        antiWrap={({ children }) => (
          <CustomLink
            link={field as FilledLink}
            className={`${buttonClassName} ${
              buttonStyle === 'filled' && buttonClassNameFilled
            } ${className}`}
          >
            {children}
          </CustomLink>
        )}
      >
        {text ?? 'Découvrir'}
      </ConditionalWrap>

      <ContactPopup open={contactOpen} onClose={() => setContactOpen(false)} />
    </Fragment>
  );
};

export const NormalButton: FC<
  IGeneralComponentProps<INormalButton, ButtonHTMLAttributes<HTMLButtonElement>>
> = (props) => {
  const {
    className,
    buttonStyle = 'outline',
    children,
    disabled,
    ...other
  } = props;
  return (
    <button
      disabled={disabled}
      className={clsx(
        buttonClassName,
        buttonStyle === 'filled' && buttonClassNameFilled,
        className ?? ''
      )}
      {...other}
    >
      {children}
    </button>
  );
};

export const PaginationButton: FC<IGeneralComponentProps<IPaginationButton>> = (
  props
) => {
  const { className, disabled, url, active, children } = props;
  const locale = useRouter().locale;
  const Comp = disabled ? 'div' : Link;

  return (
    <Comp
      href={disabled ? undefined : url}
      className={clsx(
        buttonClassName,
        className,
        disabled && 'cursor-not-allowed pointer-events-none bg-transparent',
        active
          ? 'pointer-events-none cursor-auto'
          : 'bg-tranparent text-primary',
        active && 'bg-transparent border-none',
        'grid place-items-center w-9 sm:w-12 h-9 sm:h-12 px-0 py-0'
      )}
      locale={locale}
    >
      {children}
    </Comp>
  );
};
