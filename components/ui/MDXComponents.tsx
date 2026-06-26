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
      className="h-auto w-full rounded-md object-cover"
    />
  ),
  a: (props: any) => (
    <Link href={props.href} className="text-teal-700 dark:text-teal-500">
      {props.children}
    </Link>
  ),
};

export default MDXComponents;
