export type PostPreviewMode = 'compact' | 'full';

export type Post = {
  title: string;
  excerpt: string;
  slug: string;
  content: string;
  date: string;
  readTime: string;
  coverImage: string;
  showCover?: boolean;
  draft?: boolean;
  author: {
    name: string;
    image: string;
  };
  ogImage?: {
    url: string;
  };
};

export type Project = {
  image: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  github?: string;
};
