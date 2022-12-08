import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const MDXComponents = {
  a: (props: any) => (
    <Link href={props.href} className="text-orange-600">
      {props.children}
    </Link>
  ),
};

export default MDXComponents;
