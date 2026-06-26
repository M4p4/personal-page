'use client';

import dynamic from 'next/dynamic';
import Spinner from 'components/ui/Spinner';

const VoxelLoader = dynamic(() => import('./VoxelLoader'), {
  ssr: false,
  loading: () => <Spinner />,
});

const VoxelHero = () => {
  return (
    <div className="relative">
      <VoxelLoader />
      <div className="px-2 w-full absolute bottom-1 left-0 right-0 md:px-10">
        <div className="bg-orange-200/30 dark:bg-zinc-700/30 text-center w-full p-3 rounded-md my-3">
          I am working remotely from europe based in 🇩🇪
        </div>
      </div>
      <div className="absolute opacity-20 dark:opacity-40 -top-[100px] lg:-top-[200px] -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="background for voxel" src="/images/bg-voxel.png" />
      </div>
    </div>
  );
};

export default VoxelHero;
