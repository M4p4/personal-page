import Project from 'components/project';
import ImageSlider from 'components/ui/ImageSlider';
import { getAllPosts } from 'lib/MDXLoader';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { Post } from 'types';
import Posts from '../components/posts/Posts';
import Spinner from '../components/ui/Spinner';

const VoxelLoader = dynamic(
  () => import('../components/animation/VoxelLoader'),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

type Props = {
  posts: Post[];
};

const HomePage: FC<Props> = ({ posts }) => {
  const latestPosts = useMemo(
    () => (posts.length > 2 ? posts.slice(0, 2) : posts),
    [posts]
  );

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

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col py-2 w-full md:w-auto">
          <h1 className="text-4xl font-bold dark:text-zinc-100">Jaro Ratz</h1>
          <p className="mt-1">Full Stack Web Developer and SEO Specialist</p>
        </div>

        <div className="h-24 w-24">
          <Image
            className="object-cover rounded-full border border-slate-300 dark:border-zinc-700 h-full"
            src="/images/me.jpg"
            alt="Jaro Ratz"
            width={180}
            height={180}
          />
        </div>
      </div>

      <div className="py-4">
        <h2 className="text-xl font-semibold dark:text-zinc-100 py-1">Work</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          illo accusantium, facilis error ab molestias ratione excepturi odit
          sapiente ex libero, inventore provident quidem minus? Assumenda nemo
          aliquam qui excepturi.
        </p>
      </div>

      <div className="py-4">
        <h2 className="text-xl font-semibold dark:text-zinc-100 py-1">
          Projects
        </h2>
        <Project
          title="Project #1"
          date="2022"
          description={
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident recusandae assumenda perspiciatis, totam voluptatem pariatur, iusto suscipit minus aliquam, officia ratione! Ratione, ad magnam! Sit in porro ratione molestias quidem!'
          }
          images={[
            'https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2205&q=80',
            'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          ]}
          tags={['nextjs', 'react', 'tailwindcss']}
        />
        <Project
          title="Project #2"
          description={
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident recusandae assumenda perspiciatis, totam voluptatem pariatur, iusto suscipit minus aliquam, officia ratione! Ratione, ad magnam! Sit in porro ratione molestias quidem!'
          }
          date="2021-2022"
          images={[
            'https://images.unsplash.com/photo-1496347646636-ea47f7d6b37b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2205&q=80',
            'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          ]}
          right
          tags={['nextjs', 'react', 'tailwindcss']}
        />
      </div>

      <div className="py-4">
        <h2 className="text-xl font-semibold dark:text-zinc-100 pt-1 pb-2">
          Latest Posts
        </h2>
        <Posts mode="compact" posts={latestPosts} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let posts = getAllPosts([
    'title',
    'excerpt',
    'author',
    'coverImage',
    'date',
    'readTime',
    'slug',
  ]);
  return {
    props: { posts },
  };
};

export default HomePage;
