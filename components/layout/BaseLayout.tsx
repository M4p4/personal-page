import React, { FC } from 'react';
import Footer from '../footer';
import Navbar from '../navbar';

type Props = {
  children: React.ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl y-2 mx-auto min-h-screen px-5 md:px-3">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;
