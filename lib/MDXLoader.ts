import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post } from 'types';

const postsDirectory = path.join(process.cwd(), '/_posts');
const isProduction = process.env.NODE_ENV === 'production';

const readPost = (slug: string) =>
  matter(fs.readFileSync(path.join(postsDirectory, `${slug}.mdx`), 'utf8'));

export const getAllSlugs = () => {
  const slugs = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));

  return isProduction
    ? slugs.filter((slug) => readPost(slug).data.draft !== true)
    : slugs;
};

export const getPostBySlug = (slug: string, selection: string[] = []) => {
  const { data, content } = readPost(slug);

  const items: Record<string, unknown> = {};

  selection.forEach((field) => {
    if (field === 'tags') {
      items[field] = Array.isArray(data.tags) ? data.tags.map(String) : [];
      return;
    }
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

  return items as Post;
};

export function getAllPosts(selection: string[] = []) {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, selection))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// Posts are sorted newest-first, so the neighbour at index + 1 is older and
// the one at index - 1 is newer.
export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts(['title', 'slug', 'date']);
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { older: null, newer: null };
  }

  const toLink = (post?: Post) =>
    post ? { title: post.title, slug: post.slug } : null;

  return {
    older: toLink(posts[index + 1]),
    newer: toLink(posts[index - 1]),
  };
}
