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

      <div className="mt-4 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col py-2 md:w-auto">
          <h1 className="text-4xl leading-tight font-bold md:leading-normal xl:text-5xl dark:text-zinc-100">
            I'm{' '}
            <span className="text-orange-600 dark:text-orange-400">Jaro</span>.
            I'm a full stack developer and SEO specialist.
          </h1>
        </div>

        <Image
          className="h-32 w-32 rounded-full border border-slate-300 object-cover dark:border-zinc-700"
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
        With 9 years of experience in web development and SEO, I am a skilled
        specialist with a passion for building beautiful, high-performing
        websites. My focus is on delivering results and helping businesses
        succeed online, and I specialize in using latest frameworks like Flask
        or NextJS to create dynamic and effective online solutions.
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
