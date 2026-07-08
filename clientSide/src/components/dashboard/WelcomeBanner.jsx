import {
  Sparkles,
  TrendingUp,
  CalendarDays,
  RefreshCcw,
} from "lucide-react";

const WelcomeBanner = ({
  userName = "Creator",
  stats = {},
  onRefresh,
  loading = false,
}) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Future me backend se aayega
  const growth = stats?.growth ?? "+0%";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-cyan-600/20 backdrop-blur-xl p-8 mb-8">

      {/* Glow Effects */}

      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>

      {/* Content */}

      <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8">

        {/* Left Side */}

        <div>

          <div className="flex items-center gap-2 text-cyan-400">

            <Sparkles size={18} />

            <span className="uppercase tracking-widest text-xs font-semibold">

              Analytics Dashboard

            </span>

          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">

            Welcome back,

            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">

              {" "}
              {userName}

            </span>

            👋

          </h1>

          <p className="mt-4 max-w-2xl text-gray-300 leading-7">

            Here's an overview of your blog performance,
            audience engagement and overall growth.

          </p>

          {/* Today's Date */}

          <div className="mt-6 flex items-center gap-2 text-gray-400">

            <CalendarDays size={18} />

            <span>{today}</span>

          </div>

        </div>

        {/* Right Side */}

        <div className="min-w-[300px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-400">

                Monthly Growth

              </p>

              <h2 className="mt-2 text-4xl font-bold text-green-400">

                {growth}

              </h2>

            </div>

            <div className="rounded-2xl bg-green-500/20 p-4">

              <TrendingUp
                size={28}
                className="text-green-400"
              />

            </div>

          </div>

          <div className="mt-6 border-t border-white/10 pt-6">

            <p className="text-sm leading-6 text-gray-300">

              Keep publishing quality blogs consistently to
              improve engagement, views and follower growth.

            </p>

          </div>

          {/* Refresh */}

          <button
            onClick={onRefresh}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCcw
              size={18}
              className={loading ? "animate-spin" : ""}
            />

            {loading ? "Refreshing..." : "Refresh Dashboard"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default WelcomeBanner;