import { JSXMapSerializer } from '@prismicio/react';

import { CustomLink } from './CustomLink';
import { Heading } from './Heading';

export const richTextComponents: JSXMapSerializer = {
  heading1: ({ children }) => <Heading as="h1">{children}</Heading>,
  heading2: ({ children }) => <Heading as="h2">{children}</Heading>,
  heading3: ({ children }) => <Heading as="h3">{children}</Heading>,
  paragraph: ({ children }) => (
    <p className="text-sm font-raleway text-text leading-6 font-normal">
      {children}
    </p>
  ),
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  preformatted: ({ children }) => (
    <p className="blockquote whitespace-pre-wrap text-lg font-mono pl-7 text-white opacity-100 mt-16 mb-20 border-solid border-0 border-l-4 border-white font-normal">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <CustomLink
      link={node.data}
      className="text-xs font-raleway no-underline cursor-pointer text-primary bg-transparent hover:no-underline hover:bg-secondary focus:no-underline visited:no-underline visited:outline-none hover:outline-none focus:outline-none"
    >
      {children}
    </CustomLink>
  ),
};
