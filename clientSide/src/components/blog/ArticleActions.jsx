import { Heart, Bookmark, Share2, ChevronUp } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Context from "../../context/Context.jsx";
import { getLikeStatus, toggleLike } from "../../services/like.service";
import {
  getBookmarkStatus,
  toggleBookmark,
} from "../../services/bookmark.service";

const ArticleActions = ({ blogId }) => {
  const auth = useContext(Context);

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    if (!blogId) return;

    console.log("BLOG ID:", blogId);

    const fetchLike = async () => {
      try {
        const data = await getLikeStatus(blogId);

        console.log("GET LIKE STATUS =>", data);

        setLiked(data.liked);
        setCount(data.count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLike();

    if (!auth.isAuthenticated) {
      setBookmarked(false);
      return;
    }

    const fetchBookmark = async () => {
      try {
        const isBookmarked = await getBookmarkStatus(blogId);
        setBookmarked(isBookmarked);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookmark();
  }, [blogId, auth.isAuthenticated]);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const data = await toggleLike(blogId);

      console.log(data);

      setLiked(data.liked);
      setCount(data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (bookmarkLoading) return;

    if (!auth.isAuthenticated) {
      toast.info("Please login to save articles.");
      return;
    }

    setBookmarkLoading(true);

    try {
      const data = await toggleBookmark(blogId);

      setBookmarked(data.bookmarked);

      auth.setBookmarkCount((prev) =>
        data.bookmarked ? prev + 1 : Math.max(0, prev - 1)
      );

      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed left-6 top-1/2 z-40 hidden md:flex -translate-y-1/2">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-brand-card/80 p-3 backdrop-blur-xl shadow-xl">
        {/* Like */}
        <button
          disabled={loading}
          onClick={handleLike}
          className={`rounded-xl p-3 transition ${
            liked
              ? "bg-red-500 text-white"
              : "bg-white/5 text-gray-400 hover:text-red-400"
          }`}
        >
          <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
        </button>

        <span className="text-center text-xs font-semibold text-gray-300">
          {count}
        </span>

        {/* Bookmark */}
        <button
          disabled={bookmarkLoading}
          onClick={handleBookmark}
          className={`rounded-xl p-3 transition disabled:opacity-60 ${
            bookmarked
              ? "bg-blue-500 text-white"
              : "bg-white/5 text-gray-400 hover:text-blue-400"
          }`}
        >
          <Bookmark
            className="h-5 w-5"
            fill={bookmarked ? "currentColor" : "none"}
          />
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="rounded-xl bg-white/5 p-3 text-gray-400 transition hover:text-purple-400"
        >
          <Share2 className="h-5 w-5" />
        </button>

        {/* Scroll Top */}
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="rounded-xl bg-white/5 p-3 text-gray-400 transition hover:text-white"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ArticleActions;