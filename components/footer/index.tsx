import GithubIcon from 'components/icons/GithubIcon';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="p-5">
      <div className="text-center inline-flex justify-center w-full">
        Explore source on{' '}
        <Link
          href="https://github.com/M4p4/personal-page"
          className="ml-1 inline-flex justify-center items-center hover:underline"
        >
          <GithubIcon className="h-4 w-4" />{' '}
          <span className="ml-1 font-medium">Github</span>
        </Link>
      </div>
      <div className="p-4 text-center text-zinc-500">© 2022 Jaro Ratz</div>
    </footer>
  );
};

export default Footer;
