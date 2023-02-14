import '../styles/globals.css';
import type { AppProps } from 'next/app';
import BaseLayout from '../components/layout/BaseLayout';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from 'components/ui/MDXComponents';
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <AnimatePresence>
        <BaseLayout key={router.route}>
          <Component {...pageProps} />
        </BaseLayout>
      </AnimatePresence>
    </MDXProvider>
  );
}
