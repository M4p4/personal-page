'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { classNames } from 'lib/helpers';
import React, { FC, PointerEvent, useRef, useState } from 'react';
import type { Project as ProjectType } from 'types';
import Project from '.';

type Props = {
  projects: ProjectType[];
};

const SWIPE_THRESHOLD = 40;

const arrowClassName =
  'grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-slate-300 transition-colors hover:border-orange-600 hover:text-orange-600 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-orange-400 dark:hover:text-orange-400';

const ProjectCarousel: FC<Props> = ({ projects }) => {
  const [current, setCurrent] = useState(0);
  const startX = useRef<number | null>(null);
  const count = projects.length;

  const go = (step: number) => setCurrent((i) => (i + step + count) % count);

  const handlePointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
  };

  if (count === 0) return null;
  if (count === 1) return <Project project={projects[0]} />;

  return (
    <div aria-roledescription="carousel" aria-label="Latest projects">
      <div
        className="touch-pan-y overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="w-full shrink-0 px-px"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== current}
              inert={i !== current}
            >
              <Project project={project} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className={arrowClassName}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {projects.map((project, i) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Show ${project.title}`}
              aria-current={i === current}
              className={classNames(
                i === current
                  ? 'w-6 bg-orange-600 dark:bg-orange-400'
                  : 'w-2 bg-orange-200 hover:bg-orange-300 dark:bg-zinc-700 dark:hover:bg-zinc-600',
                'h-2 cursor-pointer rounded-full transition-all duration-300',
              )}
            />
          ))}
        </div>
        <span className="min-w-10 text-center text-sm text-zinc-600 tabular-nums dark:text-zinc-400">
          {current + 1} / {count}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className={arrowClassName}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
