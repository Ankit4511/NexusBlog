import { FilePenLine, Eye, X, Send } from "lucide-react";

const EditorHeader = ({
  previewMode,
  setPreviewMode,
  isEdit,
  onCancel,
  onPublish,
  publishing,
}) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-white/10 pb-6">
      {/* Left Side */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          {isEdit ? "Edit Technical Insight" : "Compose Technical Insight"}
        </h1>
        <p className="mt-2 text-gray-400">
          Create, preview and publish professional technical articles.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setPreviewMode(false)}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
            !previewMode
              ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          <FilePenLine size={18} />
          Write Mode
        </button>

        <button
          type="button"
          onClick={() => setPreviewMode(true)}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
            previewMode
              ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          <Eye size={18} />
          Preview Mode
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-white/10"
        >
          <X size={18} />
          Cancel
        </button>

        <button
          type="button"
          onClick={onPublish}
          disabled={publishing}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
        >
          <Send size={18} />
          {publishing ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;