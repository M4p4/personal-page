import '../styles/globals.css';
import type { AppProps } from 'next/app';
import BaseLayout from '../components/layout/BaseLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}
