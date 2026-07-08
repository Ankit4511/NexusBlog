import {
  Eye,
  Heart,
  MessageCircle,
  Trophy,
  TrendingUp,
} from "lucide-react";

const TopBlogCard = ({ blog }) => {
  if (!blog) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h2 className="text-xl font-bold text-white mb-5">
          🏆 Top Performing Blog
        </h2>

        <div className="h-64 flex items-center justify-center text-gray-400">
          No blog data available.
        </div>
      </div>
    );
  }

  // Maximum score assumed 100
  const progress = Math.min(blog.engagementScore || 0, 100);

  return (
    <div
      className="
      group
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-purple-500/40
      hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]
    "
    >
      {/* IMAGE */}

      <div className="relative overflow-hidden">

        <img
          src={blog.imgUrl}
          alt={blog.title}
          className="
            h-56
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badge */}

        <div className="absolute top-5 left-5">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-gradient-to-r
              from-purple-600
              to-blue-600
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              shadow-lg
            "
          >
            <Trophy size={16} />

            Top Performer

          </span>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-6">

        <h2 className="line-clamp-2 text-2xl font-bold text-white">

          {blog.title}

        </h2>

        <p className="mt-2 text-sm text-gray-400">

          Your highest performing article based on overall engagement.

        </p>

        {/* STATS */}

        <div className="mt-8 grid grid-cols-3 gap-4">

          <div className="rounded-2xl bg-white/5 p-4 text-center">

            <Eye
              className="mx-auto text-blue-400"
              size={22}
            />

            <p className="mt-2 text-xl font-bold text-white">

              {blog.totalViews}

            </p>

            <span className="text-xs text-gray-400">

              Views

            </span>

          </div>

          <div className="rounded-2xl bg-white/5 p-4 text-center">

            <Heart
              className="mx-auto text-red-400"
              size={22}
            />

            <p className="mt-2 text-xl font-bold text-white">

              {blog.totalLikes}

            </p>

            <span className="text-xs text-gray-400">

              Likes

            </span>

          </div>

          <div className="rounded-2xl bg-white/5 p-4 text-center">

            <MessageCircle
              className="mx-auto text-yellow-400"
              size={22}
            />

            <p className="mt-2 text-xl font-bold text-white">

              {blog.totalComments}

            </p>

            <span className="text-xs text-gray-400">

              Comments

            </span>

          </div>

        </div>

        {/* Engagement */}

        <div className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-400">

                Engagement Score

              </p>

              <h3 className="mt-1 text-3xl font-bold text-purple-300">

                {blog.engagementScore}

              </h3>

            </div>

            <div className="rounded-xl bg-green-500/20 p-3">

              <TrendingUp
                size={24}
                className="text-green-400"
              />

            </div>

          </div>

          {/* Progress */}

          <div className="mt-5">

            <div className="h-3 overflow-hidden rounded-full bg-white/10">

              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-purple-500
                  via-pink-500
                  to-blue-500
                  transition-all
                  duration-1000
                "
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="mt-2 flex justify-between text-xs text-gray-400">

              <span>Performance</span>

              <span>{progress}%</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TopBlogCard;