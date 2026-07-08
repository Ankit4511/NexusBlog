import {
  ImageIcon,
  Folder,
  Tag,
  Clock3,
  FileText,
} from "lucide-react";

const EditorSidebar = ({
  imgUrl,
  category,
  setCategory,
  tags,
  setTags,
  description,
}) => {

  const words = description.trim()
    ? description.trim().split(/\s+/).length
    : 0;

  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="space-y-6">

      {/* Featured Image */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <ImageIcon size={18} />
          Featured Image
        </h3>

        {imgUrl ? (
          <img
            src={imgUrl}
            alt="Preview"
            className="h-48 w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-white/10 text-gray-500">
            Image Preview
          </div>
        )}

      </div>

      {/* Category */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

        <label className="mb-3 flex items-center gap-2 font-semibold text-white">
          <Folder size={18} />
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#10131A] p-3 text-white outline-none"
        >
          <option>Programming</option>
          <option>Web Development</option>
          <option>AI</option>
          <option>DevOps</option>
          <option>Career</option>
        </select>

      </div>

      {/* Tags */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

        <label className="mb-3 flex items-center gap-2 font-semibold text-white">
          <Tag size={18} />
          Tags
        </label>

        <input
          type="text"
          placeholder="React, Node, MongoDB"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#10131A] p-3 text-white outline-none"
        />

        <p className="mt-2 text-xs text-gray-500">
          Separate tags with commas.
        </p>

      </div>

      {/* Statistics */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

        <h3 className="mb-4 text-lg font-semibold text-white">
          Article Statistics
        </h3>

        <div className="space-y-3">

          <div className="flex justify-between text-gray-300">
            <span className="flex items-center gap-2">
              <FileText size={16} />
              Words
            </span>

            <span>{words}</span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span className="flex items-center gap-2">
              <Clock3 size={16} />
              Read Time
            </span>

            <span>{readingTime} min</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default EditorSidebar;