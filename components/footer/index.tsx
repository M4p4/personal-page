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
      <div className="p-4 text-center text-zinc-500 inline-flex justify-center items-center w-full">
        Made with{' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="w-4 h-4 mx-1 fill-red-500"
        >
          <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path>
        </svg>{' '}
        by Jaro Ratz
      </div>
    </footer>
  );
};

export default Footer;
