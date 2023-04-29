import { PrismicProvider } from '@prismicio/react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { useComponentHydrated } from 'react-hydration-provider';
import { Context as ResponsiveContext } from 'react-responsive';

import { richTextComponents } from '@components/atoms/prismic';
import { linkResolver } from '@prismicio';
import '@styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const hydrated = useComponentHydrated();
  return (
    <ResponsiveContext.Provider value={hydrated ? undefined : { width: 1280 }}>
      <PrismicProvider
        linkResolver={linkResolver}
        richTextComponents={richTextComponents}
      >
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </PrismicProvider>
    </ResponsiveContext.Provider>
  );
}
