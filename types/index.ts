export type PostPreviewMode = 'compact' | 'full';

export type Post = {
  [key: string]: any;
};

export type Project = {
  image: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
};
