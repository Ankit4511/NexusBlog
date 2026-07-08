import { useContext } from "react";
import { UserCircle2, MapPin } from "lucide-react";
import Context from "../../context/Context.jsx";
import SocialLinks from "./SocialLinks";
import UserStats from "./UserStats";
import FollowButton from "./FollowButton";

const ProfileHeader = ({ user, isFollowing, onToggleFollow }) => {
  const auth = useContext(Context);
  const isOwnProfile = auth.user?._id === user._id;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-brand-card p-6 shadow-2xl relative overflow-hidden sm:p-8">
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-center gap-5">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-2xl object-cover shadow-xl"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 shadow-xl shadow-purple-500/20">
                <UserCircle2 className="h-11 w-11 text-white" />
              </div>
            )}

            <div className="space-y-1.5">
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {user.name}
              </h1>

              {user.bio && (
                <p className="max-w-md text-sm text-gray-400">{user.bio}</p>
              )}

              {user.location && (
                <p className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {user.location}
                </p>
              )}

              <SocialLinks
                github={user.github}
                linkedin={user.linkedin}
                portfolio={user.portfolio}
              />
            </div>
          </div>

          {!isOwnProfile && (
            <FollowButton
              userId={user._id}
              isFollowing={isFollowing}
              onToggle={onToggleFollow}
            />
          )}
        </div>

        <div className="border-t border-white/[0.05] pt-5">
          <UserStats
            followersCount={user.followersCount}
            followingCount={user.followingCount}
            blogsCount={user.blogsCount}
          />
        </div>
      </div>

      <div className="absolute top-0 right-0 h-40 w-40 bg-purple-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-500/5 blur-3xl rounded-full" />
    </div>
  );
};

export default ProfileHeader;