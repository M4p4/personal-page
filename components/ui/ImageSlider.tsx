import { classNames } from 'lib/helpers';
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
        currentImage - 1 < 0 ? images.length - 1 : currentImage - 1
      );
  };

  return (
    <div className="rounded-md bg-zinc-800 relative">
      <div className="flex flex-row items-center justify-start gap-2 px-2 h-7">
        <div className="bg-red-500 rounded-full w-2 h-2"></div>
        <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
        <div className="bg-green-500 rounded-full w-2 h-2"></div>
        <div className="absolute w-full flex-1 text-center font-semibold text-sm text-zinc-100 dark:text-zinc-800">
          {title}
        </div>
        {displayNavigation && (
          <>
            <div className="absolute left-0 top-[50%]">
              <ChevronLeftIcon
                className="w-10 h-10 hover:fill-white cursor-pointer fill-zinc-100"
                onClick={handleChangeImage.bind(null, false)}
              />
            </div>
            <div className="absolute right-0 top-[50%]">
              <ChevronRightIcon
                className="w-10 h-10 hover:fill-white cursor-pointer fill-zinc-100"
                onClick={handleChangeImage.bind(null, true)}
              />
            </div>
            <div className="absolute w-full bottom-5 flex flex-row justify-center items-center gap-3">
              {images.map((image, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurrentImage(i);
                  }}
                  className={classNames(
                    i === currentImage ? 'bg-zinc-50 ' : 'bg-zinc-200 ',
                    'p-2 rounded-full w-5 h-5 border border-zinc-50 opacity-90'
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
        className="rounded-b-md w-full object-fill h-96 md:h-80"
        width={1024}
        height={1024}
      />
    </div>
  );
};

export default ImageSlider;
