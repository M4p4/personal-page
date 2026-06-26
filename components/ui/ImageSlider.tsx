'use client';

import { blurImage, classNames } from 'lib/helpers';
import React, { FC, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

type Props = {
  images: string[];
  title?: string;
  timeout?: number;
};

const ImageSlider: FC<Props> = ({ title, images, timeout = 15 }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const displayNavigation = images.length > 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage + 1 >= images.length ? 0 : currentImage + 1);
    }, timeout * 1000);
    return () => clearInterval(interval);
  }, [currentImage, timeout, images]);

  const handleChangeImage = (forward: boolean) => {
    if (forward)
      setCurrentImage(currentImage + 1 >= images.length ? 0 : currentImage + 1);
    else
      setCurrentImage(
        currentImage - 1 < 0 ? images.length - 1 : currentImage - 1,
      );
  };

  return (
    <div className="relative rounded-md bg-zinc-800">
      <div className="flex h-7 flex-row items-center justify-start gap-2 px-2">
        <div className="h-2 w-2 rounded-full bg-red-500"></div>
        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <div className="absolute w-full flex-1 text-center text-sm font-semibold text-zinc-100 dark:text-zinc-800">
          {title}
        </div>
        {displayNavigation && (
          <>
            <div className="absolute top-[50%] left-0">
              <ChevronLeftIcon
                className="h-10 w-10 cursor-pointer fill-zinc-100 hover:fill-white"
                onClick={handleChangeImage.bind(null, false)}
              />
            </div>
            <div className="absolute top-[50%] right-0">
              <ChevronRightIcon
                className="h-10 w-10 cursor-pointer fill-zinc-100 hover:fill-white"
                onClick={handleChangeImage.bind(null, true)}
              />
            </div>
            <div className="absolute bottom-5 flex w-full flex-row items-center justify-center gap-3">
              {images.map((image, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurrentImage(i);
                  }}
                  className={classNames(
                    i === currentImage ? 'bg-zinc-50' : 'bg-zinc-200',
                    'h-5 w-5 rounded-full border border-zinc-50 p-2 opacity-90',
                  )}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
      <Image
        src={images[currentImage]}
        alt={`${title} - Picture ${currentImage + 1}`}
        className="h-96 w-full rounded-b-md object-fill md:h-80"
        width={1024}
        height={1024}
        placeholder="blur"
        blurDataURL={blurImage(1024, 1024)}
      />
    </div>
  );
};

export default ImageSlider;
