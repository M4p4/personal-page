import Posts from 'components/posts/Posts';

const BlogPage = () => {
  return (
    <div className="px-2 md:px-10">
      <div className="py-2">
        <h1 className="text-3xl font-semibold dark:text-zinc-100 pt-1 pb-2">
          Blog Posts
        </h1>
        <Posts />
      </div>
    </div>
  );
};

export default BlogPage;