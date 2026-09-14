import { CheckIcon } from '@heroicons/react/20/solid';
import { blurImage, classNames } from 'lib/helpers';
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
  input: (props: ComponentPropsWithoutRef<'input'>) =>
    props.type === 'checkbox' ? (
      <span
        className={classNames(
          'mt-[5px] inline-flex size-4.5 shrink-0 items-center justify-center rounded-md border',
          props.checked
            ? 'border-orange-500 bg-orange-500 text-white dark:border-orange-400 dark:bg-orange-400 dark:text-zinc-900'
            : 'border-slate-400 bg-white dark:border-zinc-600 dark:bg-zinc-800',
        )}
      >
        {props.checked && <CheckIcon aria-hidden className="size-3.5" />}
        <span className="sr-only">{props.checked ? 'Done:' : 'Open:'}</span>
      </span>
    ) : (
      <input {...props} />
    ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <Link href={props.href ?? ''} className="text-teal-700 dark:text-teal-500">
      {props.children}
    </Link>
  ),
};

export default MDXComponents;
