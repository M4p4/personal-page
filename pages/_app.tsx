import '../styles/globals.css';
import type { AppProps } from 'next/app';
import BaseLayout from '../components/layout/BaseLayout';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from 'components/ui/MDXComponents';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </MDXProvider>
  );
}
