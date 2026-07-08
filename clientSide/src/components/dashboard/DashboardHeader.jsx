import { CalendarDays, RefreshCcw, Download } from "lucide-react";

const DashboardHeader = () => {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8">

      {/* Header Container */}

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left */}

          <div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">

              Analytics Dashboard

            </h1>

            <p className="text-gray-400 mt-2 text-sm md:text-base">

              Track your blog performance, audience engagement and growth.

            </p>

          </div>

          {/* Right */}

          <div className="flex flex-wrap items-center gap-3">

            {/* Date */}

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">

              <CalendarDays
                size={18}
                className="text-cyan-400"
              />

              <span className="text-sm text-gray-300">

                {today}

              </span>

            </div>

            {/* Refresh */}

            <button
              className="flex items-center gap-2 px-5 py-2 rounded-xl
              bg-gradient-to-r from-purple-600 to-blue-600
              hover:scale-105
              transition-all duration-300
              shadow-lg shadow-purple-500/20"
            >

              <RefreshCcw size={18} />

              Refresh

            </button>

            {/* Export */}

            <button
              disabled
              className="flex items-center gap-2 px-5 py-2 rounded-xl
              bg-white/5
              border border-white/10
              text-gray-400
              cursor-not-allowed"
            >

              <Download size={18} />

              Export

            </button>

          </div>

        </div>

      </div>

    </div>
  );

};

export default DashboardHeader;