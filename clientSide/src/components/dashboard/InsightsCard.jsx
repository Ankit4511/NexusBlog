import { Lightbulb, Sparkles } from "lucide-react";

const InsightsCard = ({ insights = [] }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <div className="p-3 rounded-xl bg-yellow-500/20">

          <Lightbulb
            size={22}
            className="text-yellow-400"
          />

        </div>

        <div>

          <h2 className="text-xl font-bold text-white">

            Insider Insights

          </h2>

          <p className="text-gray-400 text-sm">

            Smart recommendations based on your analytics

          </p>

        </div>

      </div>

      {/* Empty State */}

      {insights.length === 0 ? (

        <div className="text-center py-10">

          <Sparkles
            size={42}
            className="mx-auto text-gray-500"
          />

          <p className="mt-4 text-gray-400">

            No insights available yet.

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {insights.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300"
            >

              <div className="flex gap-3">

                <div className="mt-1">

                  <Sparkles
                    size={18}
                    className="text-purple-400"
                  />

                </div>

                <p className="text-gray-300 leading-7 text-sm">

                  {item}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default InsightsCard;