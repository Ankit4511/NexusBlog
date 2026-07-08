import { useState, useContext } from "react";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import Context from "../../context/Context.jsx";
import { toggleFollow } from "../../services/follow.service";

const FollowButton = ({ userId, isFollowing, onToggle }) => {
  const auth = useContext(Context);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!auth.isAuthenticated) {
      toast.info("Please login to follow authors.");
      return;
    }

    setLoading(true);

    try {
      const data = await toggleFollow(userId);
      onToggle(data.following, data.followersCount);
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform active:scale-[0.98] disabled:opacity-60 ${
        isFollowing
          ? "border border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.1]"
          : "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/15 hover:scale-[1.02]"
      }`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isFollowing ? (
        <UserCheck className="h-4 w-4" />
      ) : (
        <UserPlus className="h-4 w-4" />
      )}
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;