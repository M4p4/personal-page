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
      <main className="max-w-2xl w-full mb-auto py-2 mx-auto px-5 md:px-3">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
