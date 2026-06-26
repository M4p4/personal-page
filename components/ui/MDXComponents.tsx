import { blurImage } from 'lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MDXComponents = {
  img: (props: any) => (
    <Image
      alt={props.alt}
      src={props.src}
      width={1080}
      height={720}
      sizes="(max-width: 768px) 100vw, 768px"
      placeholder="blur"
      blurDataURL={blurImage(1080, 720)}
      className="rounded-md w-full h-auto object-cover"
    />
  ),
  a: (props: any) => (
    <Link href={props.href} className="dark:text-teal-500 text-teal-700">
      {props.children}
    </Link>
  ),
};

export default MDXComponents;
