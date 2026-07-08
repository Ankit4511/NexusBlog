import React, { useState } from "react";
import { Heart, Pencil, Trash2, Check, X, MessageCircle } from "lucide-react";

import ReplyBox from "./ReplyBox";

const CommentItem = ({
  comment,
  currentUser,
  getTimeAgo,

  onDelete,
  onUpdate,
  onLike,
  onReply,
}) => {
  const [editing, setEditing] = useState(false);

  const [editText, setEditText] = useState(comment.text);

  const [showReply, setShowReply] = useState(false);

  const saveEdit = async () => {
    if (!editText.trim()) return;

    await onUpdate(comment._id, editText);

    setEditing(false);
  };

  return (
    <div className="mt-5">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:bg-white/[0.07]">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 font-bold text-white shadow-lg">
              {comment.user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* User */}

            <div>
              <h3 className="font-semibold text-white">{comment.user?.name}</h3>

              <p className="text-xs text-gray-400">
                {getTimeAgo(comment.createdAt)}
              </p>
            </div>
          </div>

          {/* Edit Delete */}

          {currentUser?._id === comment.user?._id && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(true)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-blue-400"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => onDelete(comment._id)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/20 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Body */}

        {editing ? (
          <div className="mt-4">
            <textarea
              rows={3}
              value={editText}
              maxLength={500}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none"
            />

            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditing(false);
                  setEditText(comment.text);
                }}
                className="rounded-lg bg-gray-700 p-2 text-white transition hover:bg-gray-600"
              >
                <X size={18} />
              </button>

              <button
                onClick={saveEdit}
                className="rounded-lg bg-emerald-600 p-2 text-white transition hover:bg-emerald-500"
              >
                <Check size={18} />
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-300">
            {comment.text}
          </p>
        )}
        {/* Footer */}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {/* Like */}

          <button
            onClick={() => onLike(comment._id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              comment.liked
                ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                : "bg-white/5 text-gray-300 hover:bg-red-500/10 hover:text-red-400"
            }`}
          >
            <Heart size={17} fill={comment.liked ? "currentColor" : "none"} />

            <span>{comment.likeCount}</span>
          </button>

          {/* Reply */}

          <button
            onClick={() => setShowReply(!showReply)}
            className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-purple-600 hover:text-white"
          >
            <MessageCircle size={16} />

            {showReply ? "Cancel Reply" : "Reply"}
          </button>
        </div>

        {/* Reply Box */}

        {showReply && (
          <ReplyBox
            loading={false}
            onCancel={() => setShowReply(false)}
            onReply={async (text) => {
              await onReply(comment._id, text);

              setShowReply(false);
            }}
          />
        )}

        {/* Nested Replies */}

        {comment.replies?.length > 0 && (
          <div className="relative mt-6 ml-8 border-l border-purple-500/30 pl-6">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                currentUser={currentUser}
                getTimeAgo={getTimeAgo}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onLike={onLike}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(CommentItem);
