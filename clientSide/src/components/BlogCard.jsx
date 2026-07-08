import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import UserDetail from './UserDetail';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const readTime = `${Math.max(
    1,
    Math.ceil((blog.description?.split(' ').length || 0) / 200)
  )} min read`;

  return (
    <div
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="block"
    >
      <article className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-brand-card/70 shadow-lg transition-all duration-300 hover:border-white/[0.1] hover:-translate-y-1 hover:shadow-2xl cursor-pointer">

        {/* Image */}
        <div className="relative overflow-hidden h-52 w-full">
          <img
            src={blog.imgUrl}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col justify-between h-[220px]">

          <div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-[11px] text-gray-500 font-semibold">

              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readTime}
              </div>

              <span>•</span>

              <span>
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>

            </div>

            {/* Title */}
            <h3 className="mt-3 font-display text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
              {blog.title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-400 line-clamp-3 leading-relaxed">
              {blog.description}
            </p>

          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">

            <UserDetail user={blog.user} />

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-gray-400 transition-all group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-500 group-hover:text-white">
              <ArrowRight className="h-4 w-4" />
            </div>

          </div>
        </div>

      </article>
    </div>
  );
};

export default BlogCard;