import { Link } from "react-router-dom";
import { UserCircle2 } from "lucide-react";

const UserDetail = ({ user }) => {
  const content = (
    <div className="flex items-center gap-2">
      <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/[0.06] text-gray-400">
        <UserCircle2 className="h-4.5 w-4.5" />
      </div>

      <div className="leading-tight">
        <p className="text-xs font-medium text-gray-300 hover:text-white transition-colors">
          {user?.name || "Unknown"}
        </p>
      </div>
    </div>
  );

  if (!user?._id) return content;

  return (
    <Link
      to={`/user/${user._id}`}
      onClick={(e) => e.stopPropagation()}
      className="relative z-10"
    >
      {content}
    </Link>
  );
};

export default UserDetail;