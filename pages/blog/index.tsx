import Posts from 'components/posts/Posts';

const BlogPage = () => {
  return (
    <div className="py-2">
      <h1 className="text-3xl md:text-4xl font-semibold dark:text-zinc-100 py-3">
        All Posts
      </h1>
      <Posts />
    </div>
  );
};

export default BlogPage;
