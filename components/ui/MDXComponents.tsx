import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const MDXComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl font-semibold py-3">{props.children}</h1>
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-semibold py-3">{props.children}</h2>
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold py-3">{props.children}</h3>
  ),
  strong: (props: any) => (
    <strong className="font-semibold">{props.children}</strong>
  ),
  a: (props: any) => (
    <Link href={props.href} className="text-orange-600">
      {props.children}
    </Link>
  ),
};

export default MDXComponents;
