import { useMemo } from 'react';
import { useState } from 'react';

import { asText, isFilled } from '@prismicio/helpers';
import { PrismicText } from '@prismicio/react';
import { ImageField } from '@prismicio/types';
import Image from 'next/image';
import Link from 'next/link';

import {
  NavigationDocument,
  NavigationDocumentDataLinksItem,
  SettingsDocumentDataSocialMediaItem,
} from '.slicemachine/prismicio';
import { ConditionalWrap } from '@components/atoms/ConditionalWrap';
import { CustomLink } from '@components/atoms/CustomLink';
import { FullMenuButton } from '@components/atoms/FullMenuButton';
import { GoToTop } from '@components/atoms/GoToTop';
import { clsx, useResponsive } from '@utils/common';
import { FilledLink, Nullable } from 'types/common';

interface IHeader {
  navigation: NavigationDocument;
  logo: ImageField;
  siteName: string;
  socialMedia: SettingsDocumentDataSocialMediaItem[];
}

export const Header = ({ navigation, logo, siteName }: IHeader) => {
  const { lg } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<Nullable<number>>(null);
  const links = useMemo(() => {
    const groupedLink: Array<
      NavigationDocumentDataLinksItem & {
        children: NavigationDocumentDataLinksItem[];
      }
    > = [];

    navigation.data!.links.forEach((link: NavigationDocumentDataLinksItem) => {
      if (link!.parent === null) {
        groupedLink.push({ ...link, children: [] });
      } else {
        if (groupedLink.some((_link) => asText(_link.label) === link.parent)) {
          groupedLink
            .find((_link) => asText(_link.label) === link.parent)!
            .children.push(link);
        } else {
          groupedLink.push({ ...link, children: [] });
        }
      }
    });
    return groupedLink;
  }, [navigation]);

  const logoElement = useMemo(() => {
    return isFilled.image(logo) ? (
      <Link href="/" className="flex flex-1 max-w-[100px] sm:flex">
        <Image
          src={logo.url}
          alt={logo.alt ?? siteName}
          width={1000}
          height={255}
          className=""
          quality={100}
        />
      </Link>
    ) : (
      <Link href="/" className="text-xl font-semibold tracking-tight">
        {siteName}
      </Link>
    );
  }, [logo, siteName]);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  const handleToggleSubmenu = (index: number) => {
    if (index === openSubmenu) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(index);
    }
  };
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={clsx(
        'header fixed bg-primary z-[99] w-full m-0 h-20',
        'flex flex-nowrap items-center px-3'
      )}
    >
      <div
        className={clsx(
          'header-inner flex flex-wrap justify-between items-center w-full py-2',
          'lg:flex-nowrap'
        )}
      >
        <div
          className={
            'header-logo-container relative flex flex-shrink  basis-1/2 z-[101]'
          }
        >
          {logoElement}
        </div>
        {!lg && (
          <div
            className={`flex flex-nowrap justify-end items-center basis-1/2 z-[101] `}
          >
            <FullMenuButton
              isMenuOpened={menuOpen}
              onClick={handleMenuToggle}
            />
          </div>
        )}
        <div
          className={clsx(
            'fullscreen-menu pt-32',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
            'w-full fixed top-0 right-0 h-full bg-primary z-[100] transition-transform duration-500 ease-in-out',
            'lg:relative lg:transform-none lg:p-0'
          )}
        >
          <nav className="relative">
            <ul
              className={clsx(
                'navigation relative flex flex-col flex-nowrap justify-center items-center',
                'lg:flex-row lg:justify-end lg:items-center'
              )}
            >
              {links.map((item, index) => (
                <li
                  key={index}
                  className={clsx(
                    item.children.length > 0 ? 'dropdown' : '',
                    'relative pb-[20px] text-center',
                    'lg:pb-0'
                  )}
                >
                  <ConditionalWrap
                    condition={isFilled.link(item.link)}
                    wrap={({ children }) => (
                      <CustomLink
                        onClick={handleMenuClose}
                        link={item.link as FilledLink}
                        className={clsx(
                          'relative cursor-pointer font-raleway text-[20px] font-normal uppercase',
                          ' text-white transition-all duration-300 ease-linear sm:text-[30px]',
                          'lg:text-sm lg:p-4'
                        )}
                      >
                        {children}
                      </CustomLink>
                    )}
                    antiWrap={({ children }) => (
                      <div
                        onClick={() => handleToggleSubmenu(index)}
                        className={clsx(
                          'relative  cursor-pointer font-raleway text-[20px] font-normal uppercase',
                          'text-white transition-all duration-300 ease-linear sm:text-[30px]'
                        )}
                      >
                        {children}
                      </div>
                    )}
                  >
                    {asText(item.label)}
                  </ConditionalWrap>

                  {item.children.length > 0 && (
                    <ul
                      className={`${
                        index === openSubmenu
                          ? 'max-h-[500px] duration-1000 ease-linear'
                          : 'max-h-0 duration-700 ease-linear'
                      } relative overflow-hidden transition-[max-height]  flex flex-col flex-nowrap justify-center items-center`}
                    >
                      {item.children.map((_child, childIndex) => (
                        <li
                          key={childIndex}
                          className={`relative text-center ${
                            childIndex === item.children.length
                              ? ' mb-[15px]'
                              : 'mb-[8px]'
                          } ${childIndex === 0 && 'mt-[15px]'}`}
                        >
                          {isFilled.link(_child.link) ? (
                            <CustomLink
                              link={_child.link}
                              className="cursor-pointer font-raleway text-[18px] font-normal capitalize text-[#666666] transition-all duration-300 ease-linear hover:text-white"
                              onClick={handleMenuClose}
                            >
                              <PrismicText field={_child.label} />
                            </CustomLink>
                          ) : (
                            <div className="cursor-pointer font-raleway text-[18px] font-normal capitalize text-[#666666] transition-all duration-300 ease-linear hover:text-white">
                              <PrismicText field={_child.label} />
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <GoToTop />
    </header>
  );
};
