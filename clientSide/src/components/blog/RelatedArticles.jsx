import BlogCard from "../BlogCard";

const RelatedArticles = ({ blogs = [], currentBlogId }) => {
  const relatedBlogs = blogs
    .filter((blog) => blog._id !== currentBlogId)
    .slice(0, 3);

  if (relatedBlogs.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Related Articles
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Continue reading similar articles.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {relatedBlogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;