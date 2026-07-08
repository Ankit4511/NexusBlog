import { Sparkles, SearchX } from 'lucide-react';
import BlogCard from './BlogCard';

const LatestInsights = ({ blogs, query, searchQuery }) => {
  return (
    <div id="latest-insights" className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4.5">
        <div className="space-y-1">
          <h2 className="font-display flex items-center gap-2 text-xl font-bold text-white">
            <Sparkles className="h-5 w-5 text-purple-400" />
            {query ? `Results for "${searchQuery}"` : 'Latest Insights'}
          </h2>

          <p className="text-xs text-gray-400">
            Showing {blogs.length} article{blogs.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] py-12 text-center">
          {query && <SearchX className="h-8 w-8 text-gray-500" />}

          <p className="text-sm text-gray-400">
            {query
              ? `No articles match "${searchQuery}"`
              : 'No blogs published yet. Be the first to write one!'}
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

export default LatestInsights;