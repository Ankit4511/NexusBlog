import { useContext} from 'react';
import Context from '../context/Context.jsx';
import MyBlog from '../components/MyBlog.jsx';
import { Mail, UserCircle2, Plus, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';


const Profile = () => {
  const auth = useContext(Context);

  

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-white/[0.06] bg-brand-card p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 shadow-xl shadow-purple-500/20">
              <UserCircle2 className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {auth.user?.name}
              </h1>
              <p className="text-sm text-gray-400 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {auth.user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/saved"
              className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              <Bookmark className="h-5 w-5 text-yellow-400" />
              Saved
              {auth.bookmarkCount > 0 && (
                <span className="rounded-full bg-white/[0.1] px-2 py-0.5 text-xs">
                  {auth.bookmarkCount}
                </span>
              )}
            </Link>

            <Link
              to="/addblog"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/15 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
              Create New Article
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-40 w-40 bg-purple-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-500/5 blur-3xl rounded-full" />
      </div>

      <MyBlog />
    </div>
  );
};

export default Profile;