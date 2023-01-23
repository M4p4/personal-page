import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import NavbarButton from './NavbarButton';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import NavbarItem from './NavbarItem';
import GithubIcon from 'components/icons/GithubIcon';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  {
    name: (
      <div className="inline-flex justify-center items-center gap-1">
        <GithubIcon className="w-5 h-5" /> Github
      </div>
    ),
    href: 'https://github.com/m4p4',
  },
  { name: 'Contact', href: '/contact' },
];

const variants = {
  open: { opacity: 1, y: '0' },
  closed: { opacity: 0, y: '100%' },
};

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useRouter();
  return (
    <header className="sticky backdrop-blur-md w-full top-0 py-2 px-3 z-10">
      <nav className="flex flex-row items-center gap-3 max-w-2xl mx-auto px-0 md:px-3">
        <NavbarButton
          onClick={() => {
            if (!showMenu) {
              setShowMenu(false);
            }
            setShowMenu(!showMenu);
          }}
          className="md:hidden"
        >
          {showMenu ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </NavbarButton>
        {navigation.map((item) => (
          <NavbarItem
            key={item.href}
            text={item.name}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}

        <div className="flex-1"></div>
        <ThemeToggle />
      </nav>

      <motion.nav animate={showMenu ? 'open' : 'closed'} variants={variants}>
        {showMenu ? (
          <div
            className="z-50 mt-2"
            onClick={() => {
              setShowMenu(false);
            }}
          >
            {navigation.map((item) => (
              <NavbarItem
                key={item.href}
                text={item.name}
                href={item.href}
                isActive={pathname === item.href}
                isMobile
              />
            ))}
          </div>
        ) : null}
      </motion.nav>
    </header>
  );
};

export default Navbar;
