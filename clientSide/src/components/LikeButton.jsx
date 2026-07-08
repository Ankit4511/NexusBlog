import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import {
  toggleLike,
  getLikeStatus,
} from "../services/like.service";

const LikeButton = ({ blogId }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await getLikeStatus(blogId);

        setLiked(response.liked);
        setCount(response.count);
      } catch (error) {
        console.log(error);
      }
    };

    if (blogId) {
      fetchLikeStatus();
    }
  }, [blogId]);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await toggleLike(blogId);

      setLiked(response.liked);
      setCount(response.count);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
    >
      <Heart
        className={`h-4 w-4 transition-all ${
          liked
            ? "fill-red-500 text-red-500"
            : "text-gray-400 hover:text-red-500"
        }`}
      />

      <span className={liked ? "text-red-400" : "text-gray-400"}>
        {count}
      </span>
    </button>
  );
};

export default LikeButton;