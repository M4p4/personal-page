import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post } from 'types';

const postsDirectory = path.join(process.cwd(), '/_posts');

export const getAllSlugs = () => {
  const files = fs.readdirSync(postsDirectory);
  return files.map((file) => file.replace(/\.mdx$/, ''));
};

export const getPostBySlug = (slug: string, selection: string[] = []) => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Post = {};

  selection.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
};

export function getAllPosts(selection: string[] = []) {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, selection))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
