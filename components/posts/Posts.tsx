import React, { FC } from 'react';
import { Post, PostPreviewMode } from '../../types';
import { classNames } from '../../lib/helpers';
import PostPreview from './PostPreview';

type Props = {
  mode?: PostPreviewMode;
  posts: Post[];
};

const Posts: FC<Props> = ({ posts, mode = 'full' }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-5 mx-auto font-medium bg-orange-200/30 dark:bg-zinc-700/30 rounded-md">
        There are no posts yet!
      </div>
    );
  }

  return (
    <div
      className={classNames(
        'grid grid-cols-1 gap-4',
        mode === 'compact' ? 'md:grid-cols-2' : ''
      )}
    >
      {posts.map((post) => (
        <PostPreview key={post.title} mode={mode} post={post} />
      ))}
    </div>
  );
};

export default Posts;
