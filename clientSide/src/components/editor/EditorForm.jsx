import { Type, ImageIcon, FileText } from "lucide-react";

const EditorForm = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  imgUrl,
  setImgUrl,
  description,
  setDescription,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Article Content
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Start writing your next amazing article.
        </p>
      </div>

      {/* Title */}

      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-300">
          <Type size={16} />
          Article Title
        </label>

        <input
          type="text"
          placeholder="Enter article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#10131A] px-5 py-4 text-white outline-none transition focus:border-purple-500"
        />
      </div>

      {/* Subtitle */}

      <div className="mb-6">
        <label className="mb-2 text-sm font-semibold text-gray-300 block">
          Subtitle (Optional)
        </label>

        <input
          type="text"
          placeholder="Write a short subtitle..."
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#10131A] px-5 py-4 text-white outline-none transition focus:border-purple-500"
        />
      </div>

      {/* Featured Image */}

      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-300">
          <ImageIcon size={16} />
          Featured Image URL
        </label>

        <input
          type="text"
          placeholder="Paste image URL..."
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#10131A] px-5 py-4 text-white outline-none transition focus:border-purple-500"
        />
      </div>

      {/* Content */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-300">
          <FileText size={16} />
          Article Content
        </label>

        <textarea
          rows={18}
          placeholder="Write your article here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-none rounded-2xl border border-white/10 bg-[#10131A] px-5 py-5 text-white outline-none transition focus:border-purple-500"
        />
      </div>

    </div>
  );
};

export default EditorForm;