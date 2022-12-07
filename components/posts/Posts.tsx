import React, { FC } from 'react';
import { PostPreviewMode } from '../../types';
import { classNames } from '../../lib/helpers';
import PostPreview from './PostPreview';

type Props = {
  mode?: PostPreviewMode;
};

const Posts: FC<Props> = ({ mode = 'full' }) => {
  return (
    <div
      className={classNames(
        'grid grid-cols-1 gap-4',
        mode === 'compact' ? 'md:grid-cols-2' : ''
      )}
    >
      <PostPreview mode={mode} />
      <PostPreview mode={mode} />
    </div>
  );
};

export default Posts;
