import { Link } from "react-router-dom";
import {
  Eye,
  Heart,
  MessageCircle,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";

const RecentPostsTable = ({ posts = [] }) => {

  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

        <h2 className="text-2xl font-bold text-white mb-6">

          Recent Posts

        </h2>

        <div className="py-20 text-center text-gray-400">

          No blogs found.

        </div>

      </div>
    );
  }

  return (

    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-white">

            Recent Posts

          </h2>

          <p className="text-sm text-gray-400 mt-1">

            Your latest published articles

          </p>

        </div>

        <span className="rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">

          {posts.length} Posts

        </span>

      </div>

      {/* Cards */}

      <div className="space-y-4">

        {posts.map((post) => (

          <div
            key={post._id}
            className="
              group
              flex
              flex-col
              lg:flex-row
              lg:items-center
              justify-between
              gap-6
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-5
              transition-all
              duration-300
              hover:border-purple-500/30
              hover:bg-white/[0.08]
              hover:-translate-y-1
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-5">

              <img
                src={post.imgUrl}
                alt={post.title}
                className="
                  h-20
                  w-28
                  rounded-xl
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

              <div>

                <h3 className="text-lg font-semibold text-white line-clamp-2">

                  {post.title}

                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">

                  <CalendarDays size={15} />

                  {new Date(post.createdAt).toLocaleDateString()}

                </div>

              </div>

            </div>

            {/* CENTER */}

            <div className="grid grid-cols-3 gap-6">

              <div className="text-center">

                <Eye
                  className="mx-auto text-blue-400"
                  size={18}
                />

                <p className="mt-2 font-bold text-white">

                  {post.totalViews}

                </p>

                <span className="text-xs text-gray-400">

                  Views

                </span>

              </div>

              <div className="text-center">

                <Heart
                  className="mx-auto text-red-400"
                  size={18}
                />

                <p className="mt-2 font-bold text-white">

                  {post.totalLikes}

                </p>

                <span className="text-xs text-gray-400">

                  Likes

                </span>

              </div>

              <div className="text-center">

                <MessageCircle
                  className="mx-auto text-yellow-400"
                  size={18}
                />

                <p className="mt-2 font-bold text-white">

                  {post.totalComments}

                </p>

                <span className="text-xs text-gray-400">

                  Comments

                </span>

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-3">

              <Link
                to={`/edit-blog/${post._id}`}
                className="
                  rounded-xl
                  bg-blue-500/20
                  p-3
                  text-blue-400
                  transition-all
                  hover:scale-105
                  hover:bg-blue-500/30
                "
              >

                <Pencil size={18} />

              </Link>

              <button
                className="
                  rounded-xl
                  bg-red-500/20
                  p-3
                  text-red-400
                  transition-all
                  hover:scale-105
                  hover:bg-red-500/30
                "
              >

                <Trash2 size={18} />

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
};

export default RecentPostsTable;