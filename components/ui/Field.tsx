'use client';

import React, { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { classNames } from 'lib/helpers';

const inputClasses =
  'rounded-md border border-slate-300 bg-white px-3 py-2 placeholder:text-zinc-500 transition-colors outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800/50 dark:focus:border-orange-400 dark:focus:ring-orange-400';

type Props = {
  label: string;
  id: string;
  error?: FieldError;
  multiline?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({ label, id, error, multiline, className, ...rest }, ref) => (
    <>
      <label htmlFor={id} className="pt-2 font-semibold">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={classNames(inputClasses, className ?? '')}
          {...rest}
        />
      ) : (
        <input
          id={id}
          ref={ref as React.Ref<HTMLInputElement>}
          className={classNames(inputClasses, className ?? '')}
          {...rest}
        />
      )}
      {error && (
        <p className="text-sm text-red-700 dark:text-red-500">{error.message}</p>
      )}
    </>
  ),
);

Field.displayName = 'Field';

export default Field;
