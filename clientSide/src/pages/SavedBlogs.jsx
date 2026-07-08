import { useContext, useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import Context from "../context/Context.jsx";
import BlogCard from "../components/BlogCard";
import { getMyBookmarks } from "../services/Bookmark.service";

const SavedBlogs = () => {
  const auth = useContext(Context);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);

      try {
        const data = await getMyBookmarks();
        setBlogs(data);
        auth.setBookmarkCount(data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Saved Articles
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Articles you've bookmarked to read later.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading saved articles...</p>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-brand-card/50 py-16 text-center">
          <Bookmark className="h-8 w-8 text-gray-600" />
          <p className="text-sm text-gray-400">
            You haven't saved any articles yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedBlogs;