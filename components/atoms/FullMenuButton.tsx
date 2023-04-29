import { FC } from 'react';

import { FiMenu, FiX } from 'react-icons/fi';

import { IGeneralComponentProps } from 'types/common';

interface IFullMenuButton {
  isMenuOpened: boolean;

  onClick: () => void;
}

export const FullMenuButton: FC<IGeneralComponentProps<IFullMenuButton>> = (
  props
) => {
  const { isMenuOpened, onClick } = props;
  const renderButton = () => {
    if (isMenuOpened) {
      return <FiX color="#ffffff" size={35} />;
    } else {
      return <FiMenu color="#ffffff" size={35} />;
    }
  };
  return (
    <button
      className={`mobile-nav-toggler`}
      aria-label="menu"
      onClick={onClick}
    >
      {renderButton()}
    </button>
  );
};
