import React, { FC } from 'react';
import Footer from '../footer';
import Navbar from '../navbar';

type Props = {
  children: React.ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-orange-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-300">
      <Navbar />
      <main className="max-w-3xl mx-auto min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
