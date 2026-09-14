import { blurImage } from 'lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, { ComponentPropsWithoutRef } from 'react';

const MDXComponents = {
  img: ({ src, alt, title }: ComponentPropsWithoutRef<'img'>) => (
    <span className="not-prose my-8 block">
      <Image
        alt={alt ?? ''}
        src={typeof src === 'string' ? src : ''}
        width={1080}
        height={720}
        sizes="(max-width: 768px) 100vw, 768px"
        placeholder="blur"
        blurDataURL={blurImage(1080, 720)}
        className="h-auto w-full rounded-xl border border-slate-300 object-cover dark:border-zinc-700"
      />
      {title && (
        <span className="mt-3 block border-l-2 border-orange-500 pl-3 text-sm leading-relaxed text-zinc-600 dark:border-orange-400 dark:text-zinc-400">
          {title}
        </span>
      )}
    </span>
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <Link href={props.href ?? ''} className="text-teal-700 dark:text-teal-500">
      {props.children}
    </Link>
  ),
};

export default MDXComponents;
