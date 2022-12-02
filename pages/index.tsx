import dynamic from 'next/dynamic';
import Image from 'next/image';
import Posts from '../components/posts/Posts';
import Spinner from '../components/ui/Spinner';

const VoxelLoader = dynamic(
  () => import('../components/animation/VoxelLoader'),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

const HomePage = () => {
  return (
    <>
      <div className="relative">
        <VoxelLoader />
        <div className="px-2 w-full absolute bottom-1 left-0 right-0 md:px-10">
          <div className="bg-orange-200/30 dark:bg-zinc-700/30 text-center w-full p-5 rounded-md my-3">
            I am currently working from 🇵🇭 but I will be back soon in 🇩🇪
          </div>
        </div>
      </div>
      <div className="px-2 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col py-2 w-full md:w-auto">
            <h1 className="text-4xl font-semibold dark:text-zinc-100">
              Jaro Ratz
            </h1>
            <p className="mt-1">Web Developer and SEO Specialist</p>
          </div>

          <Image
            className="rounded-full h-24 w-24 min-h-25 border border-slate-300 dark:border-zinc-700"
            src="/images/me.jpg"
            alt="Jaro Ratz"
            width={100}
            height={100}
          />
        </div>

        <div className="py-4">
          <h2 className="text-xl font-semibold dark:text-zinc-100 py-1">
            Work
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Doloremque, illo accusantium, facilis error ab molestias ratione
            excepturi odit sapiente ex libero, inventore provident quidem minus?
            Assumenda nemo aliquam qui excepturi.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-xl font-semibold dark:text-zinc-100 pt-1 pb-2">
            Latest Posts
          </h2>
          <Posts />
        </div>
      </div>
    </>
  );
};

export default HomePage;
