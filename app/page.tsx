/* eslint-disable react/no-unescaped-entities */
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

      <div className="mt-4 flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:gap-12">
        <div className="flex w-full flex-col py-2 md:w-auto">
          <h1 className="text-4xl leading-tight font-bold md:leading-normal xl:text-5xl dark:text-zinc-100">
            Hey, I'm{' '}
            <span className="text-orange-600 dark:text-orange-400">Jaro</span>{' '}
            <span className="mt-2 block text-xl font-semibold lg:text-2xl">
              Developer & SEO Specialist
            </span>
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Currently based in Germany, with 9 years of experience developing,
            launching, and scaling websites.
          </p>
        </div>

        <Image
          className="h-44 w-44 shrink-0 rounded-full border border-slate-300 object-cover md:h-52 md:w-52 dark:border-zinc-700"
          src="/images/me.jpg"
          alt="Jaro Ratz"
          placeholder="blur"
          blurDataURL={blurImage(240, 240)}
          width={240}
          height={240}
        />
      </div>

      <Headline title="About Me" />
      <p>
        I'm a web developer who loves building things. I code mostly in Python
        and TypeScript. Right now I work mainly with Django, and before that I
        built projects with Next.js and Flask.
      </p>
      <p className="mt-4">
        Outside of web development, I'm into AI agents, self-improvement, and
        swing trading.
      </p>
      <p className="mt-4">
        This site is where I share my journey. Writing here is my way of getting
        back into my old routines, so expect posts about my projects, my trades,
        and anything else that catches my interest.
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
