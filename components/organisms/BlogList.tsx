import React, { FC } from 'react';

import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';

import { LinesBackground } from '@components/atoms/Background';
import { PaginationButton } from '@components/atoms/CustomButtons';
import { BlogPostItem } from '@components/molecules/BlogPostItem';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { clsx } from '@utils/common';
import { BlogPagePost, IGeneralComponentProps } from 'types/common';

interface IBlogList {
  posts: BlogPagePost[];
  page: number;
  totalPages: number;
}

export const BlogList: FC<IGeneralComponentProps<IBlogList>> = ({
  posts,
  page,
  totalPages,
}) => {
  return (
    <section
      className={clsx(
        'blog-post-section',
        'py-14 px-0 relative bg-white',
        'sm:py-20 lg:py-40'
      )}
    >
      <LinesBackground />
      <SectionInnerContainer className="max-w-6xl">
        <div className="flex flex-row flex-wrap -mx-4 mt-28 lg:mt-0">
          {posts.map((post, index) => {
            return <BlogPostItem key={index} post={post} />;
          })}
        </div>

        <div
          className={clsx(
            'lower-text',
            ' flex flex-row flex-nowrap items-center justify-center mt-7 relative gap-2 sm:gap-4',
            'sm:mt-0'
          )}
        >
          <PaginationButton
            url={`/blog/page/1`}
            className={clsx('view-all')}
            disabled={page === 1}
          >
            <BsChevronDoubleLeft />
          </PaginationButton>
          <PaginationButton
            url={`/blog/page/${page - 1}`}
            className={clsx('view-all')}
            disabled={page === 1}
          >
            <BsChevronLeft />
          </PaginationButton>

          <PaginationButton url="#" active>
            {page}
          </PaginationButton>

          <PaginationButton
            url={`/blog/page/${page + 1}`}
            className={clsx('view-all')}
            disabled={page === totalPages}
          >
            <BsChevronRight />
          </PaginationButton>
          <PaginationButton
            url={`/blog/page/${totalPages}`}
            className={clsx('view-all')}
            disabled={page === totalPages}
          >
            <BsChevronDoubleRight />
          </PaginationButton>
        </div>
      </SectionInnerContainer>
    </section>
  );
};
