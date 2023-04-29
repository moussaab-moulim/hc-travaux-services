import React, { FC, Fragment, useEffect, useState } from 'react';

import { BsChevronUp } from 'react-icons/bs';

export const GoToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Fragment>
      {isVisible && (
        <button
          onClick={goToTop}
          className={`fixed bg-primary bottom-16 lg:bottom-8 right-5 lg:right-8 z-[99] p-3 border-solid rounded-full border border-white shadow-xl`}
        >
          <BsChevronUp size={16} color={'white'} />
        </button>
      )}
    </Fragment>
  );
};
