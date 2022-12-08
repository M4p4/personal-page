import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { FC } from 'react';

const MDXComponents = {
  img: (props: any) => (
    <Image
      alt={props.alt}
      src={props.src}
      width={1080}
      height={720}
      layout={'responsive'}
      className="rounded-md w-full object-cover"
    />
  ),
  a: (props: any) => (
    <Link href={props.href} className="text-orange-600">
      {props.children}
    </Link>
  ),
};

export default MDXComponents;
