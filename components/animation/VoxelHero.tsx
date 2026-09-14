'use client';

import dynamic from 'next/dynamic';
import { GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid';
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
        <div className="my-3 flex w-full items-center justify-center gap-2 rounded-md bg-orange-200/30 p-3 text-center dark:bg-zinc-700/30">
          <GlobeEuropeAfricaIcon
            className="h-5 w-5 shrink-0 text-orange-600 dark:text-orange-400"
            aria-hidden="true"
          />
          Working remotely from Europe
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
