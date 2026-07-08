import { useContext, useEffect, useState, useCallback } from "react";
import Context from "../../context/Context";

import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
  toggleCommentLike,
} from "../../services/comment.service";

import CommentItem from "./CommentItem";
import { Send } from "lucide-react";

const Comments = ({ blogId }) => {
  const auth = useContext(Context);

  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const MAX_CHAR = 500;

    useEffect(() => {
    if (blogId) {
      fetchComments();
    }
  }, [blogId]);

    const fetchComments = async () => {
    try {
      const data = await getComments(blogId);

      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

    const getTimeAgo = (date) => {
    const seconds = Math.floor(
      (Date.now() - new Date(date)) / 1000
    );

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);

      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

    const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const comment = await addComment(blogId, text);

      setComments((prev) => [comment, ...prev]);

      setText("");
    } finally {
      setLoading(false);
    }
  };

    const handleDelete = useCallback(async (id) => {
    await deleteComment(id);

    const removeComment = (items) =>
      items
        .filter((c) => c._id !== id)
        .map((c) => ({
          ...c,
          replies: removeComment(c.replies || []),
        }));

    setComments((prev) => removeComment(prev));
  }, []);

    const handleUpdate = useCallback(async (id, value) => {
    const updated = await updateComment(id, value);

    const updateTree = (items) =>
      items.map((c) => {
        if (c._id === id) {
          return {
            ...c,
            text: updated.text,
          };
        }

        return {
          ...c,
          replies: updateTree(c.replies || []),
        };
      });

    setComments((prev) => updateTree(prev));
  }, []);

    // Like Comment
  const handleLike = useCallback(async (id) => {
    const res = await toggleCommentLike(id);

    const updateTree = (items) =>
      items.map((c) => {
        if (c._id === id) {
          return {
            ...c,
            liked: res.liked,
            likeCount: res.likeCount,
          };
        }

        return {
          ...c,
          replies: updateTree(c.replies || []),
        };
      });

    setComments((prev) => updateTree(prev));
  }, []);

  // Reply
  const handleReply = useCallback(
    async (parentId, replyText) => {
      const reply = await addComment(
        blogId,
        replyText,
        parentId
      );

      const insertReply = (items) =>
        items.map((item) => {
          if (item._id === parentId) {
            return {
              ...item,
              replies: [reply, ...(item.replies || [])],
            };
          }

          return {
            ...item,
            replies: insertReply(item.replies || []),
          };
        });

      setComments((prev) => insertReply(prev));
    },
    [blogId]
  );

  return (
    <div className="mt-12">

      {/* Heading */}

      <h2 className="mb-6 text-2xl font-bold text-white">
        Comments ({comments.length})
      </h2>

      {/* Add Comment */}

      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

        <textarea
          rows={4}
          value={text}
          maxLength={MAX_CHAR}
          placeholder="Write your thoughts..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === "Enter") {
              handleSubmit();
            }
          }}
          className="w-full resize-none rounded-xl bg-transparent p-3 text-white outline-none placeholder:text-gray-500"
        />

        <div className="mt-4 flex items-center justify-between">

          <span className="text-xs text-gray-400">
            {text.length}/{MAX_CHAR}
          </span>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            <Send className="h-4 w-4" />

            {loading ? "Posting..." : "Post"}

          </button>

        </div>

      </div>

      {/* Empty State */}

      {comments.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-gray-400">
          No comments yet.
        </div>
      )}

      {/* Comment Tree */}

      <div className="space-y-5">

        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            currentUser={auth.user}
            getTimeAgo={getTimeAgo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onLike={handleLike}
            onReply={handleReply}
          />
        ))}

      </div>

    </div>
  );
};

export default Comments;

