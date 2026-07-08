import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AnalyticsChart = ({ data }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-8">
      {/* Heading */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Activity Overview</h2>

        <p className="text-gray-400 mt-2">Last 30 days blog views</p>
      </div>

      {/* Chart */}

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

            <XAxis dataKey="date" stroke="#9CA3AF" />

            <YAxis stroke="#9CA3AF" />

            <Tooltip
              cursor={{
                stroke: "#8B5CF6",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
                padding: "14px",
              }}
              labelStyle={{
                color: "#A78BFA",
                fontWeight: "700",
                marginBottom: "8px",
              }}
              itemStyle={{
                color: "#FFFFFF",
                fontWeight: "600",
              }}
            />

            {/* SVG Gradient */}

            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.45} />

                <stop offset="60%" stopColor="#8B5CF6" stopOpacity={0.18} />

                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="views"
              stroke="none"
              fill="url(#colorViews)"
            />

            <Line
              type="monotone"
              dataKey="views"
              stroke="#8B5CF6"
              strokeWidth={4}
              dot={{
                r: 4,
                fill: "#8B5CF6",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: "#8B5CF6",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
              animationDuration={1800}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
