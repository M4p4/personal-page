/* eslint-disable react/no-unescaped-entities */
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
import NextHeadSeo from 'next-head-seo';
import Headline from 'components/ui/Headline';
import { blurImage } from 'lib/helpers';

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
      <NextHeadSeo
        title={'Jaro Ratz - Web Developer & SEO Specialist'}
        description={
          'I am Jaro Ratz, a web developer and SEO specialist with a passion for delivering results.'
        }
      />
      <div className="relative">
        <VoxelLoader />
        <div className="px-2 w-full absolute bottom-1 left-0 right-0 md:px-10">
          <div className="bg-orange-200/30 dark:bg-zinc-700/30 text-center w-full p-3 rounded-md my-3">
            I am currently working from europe remotly based in 🇩🇪
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-4 gap-4">
        <div className="flex flex-col py-2 w-full md:w-auto">
          <h1 className="text-4xl xl:text-5xl font-bold dark:text-zinc-100 md:leading-normal leading-tight">
            I'm{' '}
            <span className="dark:text-orange-400 text-orange-800">Jaro</span>.
            I'm a full stack developer and SEO specialist.
          </h1>
        </div>

        <Image
          className="object-cover rounded-full border border-slate-300 dark:border-zinc-700 h-32 w-32"
          src="/images/me.jpg"
          alt="Jaro Ratz"
          placeholder="blur"
          blurDataURL={blurImage(180, 180)}
          width={180}
          height={180}
        />
      </div>

      <Headline title="Work Experience" />
      <p>
        With 7 years of experience in web development and SEO, I am a skilled
        specialist with a passion for building beautiful, high-performing
        websites. My focus is on delivering results and helping businesses
        succeed online, and I specialize in using latest frameworks like Flask
        or NextJS to create dynamic and effective online solutions.
      </p>

      <Headline title="Latest Projects" />
      {projects.map((project) => (
        <Project
          key={project.title}
          project={project}
          image_right={project.image_right || false}
        />
      ))}

      <Headline title="Latest Posts" />
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
