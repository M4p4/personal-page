import Project from 'components/project';
import { getAllPosts } from 'lib/MDXLoader';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { Post } from 'types';
import Posts from '../components/posts/Posts';
import Spinner from '../components/ui/Spinner';
import projects from '../_data/projects.json';

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

      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
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

      <h2 className="text-2xl font-semibold dark:text-zinc-100 py-4">
        Work experience
      </h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
        illo accusantium, facilis error ab molestias ratione excepturi odit
        sapiente ex libero, inventore provident quidem minus? Assumenda nemo
        aliquam qui excepturi.
      </p>

      <h2 className="text-2xl font-semibold dark:text-zinc-100 py-4">
        Latest Projects
      </h2>

      {projects.map((project) => (
        <Project
          key={project.title}
          project={project}
          image_right={project.image_right || false}
        />
      ))}

      <h2 className="text-2xl font-semibold dark:text-zinc-100 py-4">
        Latest Posts
      </h2>
      <Posts mode="compact" posts={latestPosts} />
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
