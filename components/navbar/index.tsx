import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import NavbarButton from './NavbarButton';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import NavbarItem from './NavbarItem';
import { classNames } from '../../utils/helpers';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useRouter();
  return (
    <header className="sticky backdrop-blur-md w-full top-0 py-2 px-4 z-10">
      <nav className="flex flex-row items-center gap-3 max-w-3xl mx-auto">
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
            key={item.name}
            text={item.name}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}

        <div className="flex-1"></div>
        <ThemeToggle />
      </nav>
      <div className={classNames(showMenu ? '' : 'hidden', 'flex w-full')}>
        <div
          className="w-full z-50 mt-2"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          {navigation.map((item) => (
            <NavbarItem
              key={item.name}
              text={item.name}
              href={item.href}
              isActive={pathname === item.href}
              isMobile
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
