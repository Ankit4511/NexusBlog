import { Sparkles } from "lucide-react";

const PublishActions = ({
  metaDescription,
  setMetaDescription,
  publishImmediately,
  setPublishImmediately,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
        <Sparkles size={18} className="text-blue-400" />
        SEO Settings
      </h3>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
          Meta Description
        </label>
        <textarea
          rows={3}
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="Enter a tailored description to improve indexing rankings..."
          className="w-full resize-none rounded-xl border border-white/10 bg-[#10131A] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-purple-500"
        />
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-sm font-semibold text-white">Publish Immediately</p>
          <p className="text-xs text-gray-500">
            Make this article live right after saving
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPublishImmediately(!publishImmediately)}
          className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
            publishImmediately
              ? "bg-gradient-to-r from-purple-600 to-blue-500"
              : "bg-white/10"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              publishImmediately ? "translate-x-5.5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default PublishActions;