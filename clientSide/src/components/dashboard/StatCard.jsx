import { useEffect, useState } from "react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  gradient,
  subtitle,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const end = Number(value) || 0;

    if (end === 0) {
      setDisplayValue(0);
      return;
    }

    let start = 0;

    const duration = 1200;

    const increment = Math.ceil(end / 40);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setDisplayValue(start);
    }, duration / 40);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]
        hover:border-purple-500/40
        ${gradient}
      `}
    >
      {/* Background Glow */}

      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>

      {/* Floating Gradient */}

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-40"></div>

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-400">

              {title}

            </p>

            <h2 className="mt-3 text-4xl font-bold text-white">

              {new Intl.NumberFormat().format(displayValue)}

            </h2>

          </div>

          <div
            className={`
              p-4
              rounded-2xl
              transition-all
              duration-500
              hover:scale-110
              ${iconColor}
            `}
          >
            <Icon size={30} />

          </div>

        </div>

        {/* Trend */}

        <div className="mt-5 flex items-center gap-2">

          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">

            ↗ Trending

          </span>

        </div>

        {/* Footer */}

        <div className="mt-5">

          <p className="text-sm text-gray-300">

            {subtitle}

          </p>

        </div>

      </div>

    </div>
  );
};

export default StatCard;