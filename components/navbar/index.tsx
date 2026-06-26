'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import NavbarButton from './NavbarButton';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import NavbarItem from './NavbarItem';
import GithubIcon from 'components/icons/GithubIcon';
import { motion } from 'motion/react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  {
    name: (
      <div className="inline-flex items-center justify-center gap-1">
        <GithubIcon className="h-5 w-5" /> Github
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
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 w-full px-5 py-2 backdrop-blur-md md:px-3">
      <nav className="mx-auto flex max-w-4xl flex-row items-center gap-3 px-0">
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
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
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
