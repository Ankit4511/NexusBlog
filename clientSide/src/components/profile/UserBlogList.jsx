import { FileText } from "lucide-react";
import BlogCard from "../BlogCard";

const UserBlogList = ({ blogs, authorName }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-brand-card/50 py-16 text-center">
        <FileText className="h-8 w-8 text-gray-600" />
        <p className="text-sm text-gray-400">
          {authorName} hasn't published any articles yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default UserBlogList;