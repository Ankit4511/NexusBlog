import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Context from "../context/Context.jsx";
import ProfileHeader from "../components/profile/ProfileHeader";
import UserBlogList from "../components/profile/UserBlogList";
import { getUserProfile, getUserBlogs } from "../services/auth.service";
import { getFollowStatus } from "../services/follow.service";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useContext(Context);

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      try {
        const [userData, blogsData] = await Promise.all([
          getUserProfile(id),
          getUserBlogs(id),
        ]);

        setUser(userData);
        setBlogs(blogsData);

        if (auth.isAuthenticated && auth.user?._id !== id) {
          try {
            const following = await getFollowStatus(id);
            setIsFollowing(following);
          } catch {
            setIsFollowing(false);
          }
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, auth.isAuthenticated]);

  const handleToggleFollow = (following, followersCount) => {
    setIsFollowing(following);
    setUser((prev) => ({ ...prev, followersCount }));
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-sm text-gray-400">User not found.</p>

        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-white/[0.06] px-4 py-2 text-sm text-white transition hover:bg-white/[0.1]"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <ProfileHeader
        user={user}
        isFollowing={isFollowing}
        onToggleFollow={handleToggleFollow}
      />

      <div>
        <h2 className="mb-5 font-display text-xl font-bold text-white">
          Recent Articles
        </h2>
        <UserBlogList blogs={blogs} authorName={user.name} />
      </div>
    </div>
  );
};

export default UserProfile;