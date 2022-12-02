import React, { FC } from 'react';
import PostPreview from './PostPreview';

type Props = {};

const Posts: FC<Props> = ({}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PostPreview />
      <PostPreview />
    </div>
  );
};

export default Posts;
