/* eslint-disable react/no-unescaped-entities */
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Project from 'components/project';
import Posts from 'components/posts/Posts';
import Headline from 'components/ui/Headline';
import VoxelHero from 'components/animation/VoxelHero';
import { getAllPosts } from 'lib/MDXLoader';
import { blurImage } from 'lib/helpers';
import projects from '../_data/projects.json';

export default function HomePage() {
  const posts = getAllPosts([
    'title',
    'excerpt',
    'author',
    'coverImage',
    'date',
    'readTime',
    'slug',
  ]);
  const latestPosts = posts.slice(0, 2);

  return (
    <>
      <VoxelHero />

      <div className="mt-6 flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
        <div className="flex w-full flex-col gap-2 py-2 md:w-auto">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight xl:text-5xl dark:text-zinc-100">
            Jaro Ratz
          </h1>
          <p className="text-xl text-zinc-600 md:text-2xl dark:text-zinc-400">
            Full stack developer & SEO specialist
          </p>
          <p className="mt-2 text-sm font-medium tracking-widest text-orange-600 uppercase dark:text-orange-400">
            Django · Next.js · SEO
          </p>
        </div>

        <Image
          className="h-32 w-32 shrink-0 rounded-full object-cover ring-2 ring-orange-600/50 ring-offset-4 ring-offset-orange-50 md:h-36 md:w-36 dark:ring-orange-400/50 dark:ring-offset-zinc-900"
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
        I've built websites and done SEO for 9 years. These days I work mostly
        with Django.
      </p>

      <Headline title="Latest Projects" />
      {projects.map((project) => (
        <Project key={project.title} project={project} />
      ))}

      <Headline title="Latest Posts" />
      <Posts mode="compact" posts={latestPosts} />
    </>
  );
}
