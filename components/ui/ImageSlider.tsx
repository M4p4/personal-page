import { classNames } from 'lib/helpers';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  images: string[];
  title?: string;
  timeout?: number;
};

const ImageSlider: FC<Props> = ({ title, images, timeout = 15 }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage + 1 >= images.length ? 0 : currentImage + 1);
    }, timeout * 1000);
    return () => clearInterval(interval);
  }, [currentImage, timeout, images]);

  return (
    <div className="rounded-md bg-zinc-800 dark:bg-slate-100 relative">
      <div className="flex flex-row items-center justify-start gap-2 px-2 h-7">
        <div className="bg-red-500 rounded-full w-2 h-2"></div>
        <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
        <div className="bg-green-500 rounded-full w-2 h-2"></div>
        <div className="absolute w-full flex-1 text-center text-sm text-zinc-100 dark:text-zinc-800">
          {title}
        </div>
        <div className="absolute w-full bottom-5 flex flex-row justify-center items-center gap-3">
          {images.map((image, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentImage(i);
              }}
              className={classNames(
                i === currentImage ? 'p-3' : 'p-2',
                'bg-zinc-200 rounded-full w-5 h-5 border-2 border-zinc-300 hover:bg-zinc-100 opacity-70'
              )}
            ></div>
          ))}
        </div>
      </div>
      <img
        src={images[currentImage]}
        className="rounded-b-md w-full object-cover h-96"
      />
    </div>
  );
};

export default ImageSlider;
