'use client';

import { CheckIcon, LinkIcon } from '@heroicons/react/24/solid';
import React, { FC, useState } from 'react';

type Props = {
  title: string;
};

const buttonClass =
  'inline-flex h-7 w-7 items-center justify-center rounded-md opacity-60 transition-opacity hover:opacity-100 hover:bg-orange-100 dark:hover:bg-zinc-800';

const ShareButtons: FC<Props> = ({ title }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context) — fail silently.
    }
  };

  const share = (buildHref: (url: string) => string) =>
    window.open(
      buildHref(window.location.href),
      '_blank',
      'noopener,noreferrer',
    );

  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={copied ? 'Copied!' : 'Copy link'}
        className={buttonClass}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-500" />
        ) : (
          <LinkIcon className="h-4 w-4" />
        )}
      </button>

      <button
        type="button"
        onClick={() =>
          share(
            (url) =>
              `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodeURIComponent(url)}`,
          )
        }
        aria-label="Share on X"
        title="Share on X"
        className={buttonClass}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 fill-current"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() =>
          share(
            (url) =>
              `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodeURIComponent(url)}`,
          )
        }
        aria-label="Share on Bluesky"
        title="Share on Bluesky"
        className={buttonClass}
      >
        <svg
          viewBox="0 0 568 501"
          aria-hidden="true"
          className="h-4 w-4 fill-current"
        >
          <path d="M123.121 33.664C188.241 82.553 258.281 181.681 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.612 568-28.906 568 57.946c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748 114.875 19.551 144.097 84.311 80.986 149.071-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.889-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.292 0 57.946 0-28.906 76.134-1.612 123.121 33.664Z" />
        </svg>
      </button>
    </div>
  );
};

export default ShareButtons;
