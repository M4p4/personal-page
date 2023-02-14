import { PageTransition } from 'components/ui/PageTransition';
import React, { FC } from 'react';
import Footer from '../footer';
import Navbar from '../navbar';

type Props = {
  children: React.ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen h-full">
      <Navbar />
      <main className="max-w-4xl w-full mb-auto py-2 mx-auto px-5 md:px-3">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
