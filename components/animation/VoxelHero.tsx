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
      <div className="absolute right-0 bottom-1 left-0 w-full px-2 md:px-10">
        <div className="my-3 w-full rounded-md bg-orange-200/30 p-3 text-center dark:bg-zinc-700/30">
          I am working remotely from europe based in 🇩🇪
        </div>
      </div>
      <div className="absolute -top-[100px] -z-10 opacity-20 lg:-top-[200px] dark:opacity-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="background for voxel" src="/images/bg-voxel.png" />
      </div>
    </div>
  );
};

export default VoxelHero;
