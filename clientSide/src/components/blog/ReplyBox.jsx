import { Send, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const ReplyBox = ({
  onReply,
  onCancel,
  loading = false,
}) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const submitReply = () => {
    if (!text.trim()) return;

    onReply(text);
    setText("");
  };

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">

      <textarea
        ref={textareaRef}
        rows={3}
        value={text}
        maxLength={500}
        placeholder="Write a reply..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            submitReply();
          }
        }}
        className="w-full resize-none rounded-lg bg-transparent p-2 text-white outline-none placeholder:text-gray-500"
      />

      <div className="mt-3 flex items-center justify-between">

        <span className="text-xs text-gray-500">
          {text.length}/500
        </span>

        <div className="flex gap-2">

          <button
            onClick={onCancel}
            className="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-600"
          >
            <X size={16} />
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={submitReply}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            <Send size={16} />

            {loading ? "Replying..." : "Reply"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default ReplyBox;