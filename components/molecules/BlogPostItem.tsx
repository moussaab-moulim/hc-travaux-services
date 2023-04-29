import React, { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { IoTime } from 'react-icons/io5';

import { DateFormatter } from '@components/atoms/DateFormatter';
import { linkResolver } from '@prismicio';
import { clsx } from '@utils/common';
import { BlogPagePost, IGeneralComponentProps } from 'types/common';

interface IBlogPagePost {
  post: BlogPagePost;
}

export const BlogPostItem: FC<IGeneralComponentProps<IBlogPagePost>> = ({
  post,
  className,
}) => {
  return (
    <div
      className={clsx(
        'news-block relative font-raleway basis-full px-4 md:basis-1/2',
        'mb-8 sm:mb-10 lg:mb-20',
        className ?? ''
      )}
    >
      <div className="inner-box relative">
        <div className="overflow-hidden">
          <Link href={linkResolver(post)}>
            <Image
              src={post.image.url}
              alt={post.image.alt}
              width={856}
              height={822}
              quality={100}
              className={clsx(
                'object-cover w-full transition-all duration-1000 ease-ease',
                'hover:scale-105 aspect-[550/300]'
              )}
            />
          </Link>
        </div>
        <div className="bg-light p-5">
          <div className="text-primary font-extrabold text-sm lg:text-base uppercase">
            <Link href={linkResolver(post)}>{post.title}</Link>
          </div>
          <div className="flex items-center text-primary font-semibold text-xs lg:text-sm">
            <IoTime size={12} className="mr-1" />
            <DateFormatter publishDate={post.first_publication_date} />
          </div>
        </div>
      </div>
    </div>
  );
};
