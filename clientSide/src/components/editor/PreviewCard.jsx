import { CalendarDays, Clock3, UserCircle2 } from "lucide-react";

const PreviewCard = ({
  title,
  subtitle,
  description,
  imgUrl,
  category,
  tags,
}) => {
  const words = description.trim()
    ? description.trim().split(/\s+/).length
    : 0;

  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

      {/* Image */}

      {imgUrl ? (
        <img
          src={imgUrl}
          alt="preview"
          className="h-80 w-full object-cover"
        />
      ) : (
        <div className="flex h-80 items-center justify-center bg-[#10131A] text-gray-500">
          No Cover Image
        </div>
      )}

      <div className="space-y-6 p-8">

        {/* Category */}

        <span className="inline-flex rounded-full bg-purple-600/20 px-4 py-1 text-sm font-semibold text-purple-300">
          {category}
        </span>

        {/* Title */}

        <h1 className="text-5xl font-bold leading-tight text-white">
          {title || "Your Amazing Blog Title"}
        </h1>

        {/* Subtitle */}

        <p className="text-xl text-gray-400">
          {subtitle ||
            "A short subtitle will appear here..."}
        </p>

        {/* Meta */}

        <div className="flex flex-wrap items-center gap-6 text-gray-400">

          <div className="flex items-center gap-2">
            <UserCircle2 size={18} />
            You
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            Today
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={18} />
            {readTime} min read
          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-white/10" />

        {/* Content */}

        <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-300 leading-8">

          {description ||
            "Your article preview will appear here as you write..."}

        </div>

        {/* Tags */}

        {tags && (
          <div className="flex flex-wrap gap-3 pt-4">

            {tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-4 py-1 text-sm text-gray-300"
                >
                  #{tag}
                </span>
              ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default PreviewCard;