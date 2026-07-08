import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import {
  Compass,
  PenSquare,
  Bookmark,
  User,
  LayoutDashboard,
} from 'lucide-react';
import Context from '../context/Context';

const BottomNavbar = () => {
  const { isAuthenticated, bookmarkCount } = useContext(Context);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-white/[0.06] bg-brand-dark/90 backdrop-blur-md px-6 flex items-center justify-between">

      {/* Feed */}
      <Link
        to="/"
        className={`flex flex-col items-center justify-center gap-0.5 w-14 h-full text-xs font-semibold transition-colors ${
          isActive('/')
            ? 'text-purple-400'
            : 'text-gray-500 hover:text-white'
        }`}
      >
        <Compass className="h-5 w-5" />
        <span>Feed</span>
      </Link>

      {/* Write */}
      <Link
        to={isAuthenticated ? '/addblog' : '/login'}
        className={`flex flex-col items-center justify-center gap-0.5 w-14 h-full text-xs font-semibold transition-colors ${
          isActive('/addblog')
            ? 'text-purple-400'
            : 'text-gray-500 hover:text-white'
        }`}
      >
        <PenSquare className="h-5 w-5" />
        <span>Write</span>
      </Link>

      {/* Saved (Coming Soon) */}
      <button
        disabled
        className="relative flex flex-col items-center justify-center gap-0.5 w-14 h-full text-xs font-semibold text-gray-500"
      >
        <Bookmark className="h-5 w-5" />
        <span>Saved</span>

        <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[9px] font-bold text-white">
          0
        </span>
      </button>

      {/* Dashboard / Login */}
      <Link
        to={isAuthenticated ? '/profile' : '/login'}
        className={`flex flex-col items-center justify-center gap-0.5 w-14 h-full text-xs font-semibold transition-colors ${
          isActive('/profile') || isActive('/login')
            ? 'text-purple-400'
            : 'text-gray-500 hover:text-white'
        }`}
      >
        {isAuthenticated ? (
          <>
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </>
        ) : (
          <>
            <User className="h-5 w-5" />
            <span>Sign In</span>
          </>
        )}
      </Link>

      {/* Saved */}
  <Link
    to={isAuthenticated ? '/saved' : '/login'}
    className={`relative flex flex-col items-center justify-center gap-0.5 w-14 h-full text-xs font-semibold transition-colors ${
      isActive('/saved')
        ? 'text-purple-400'
        : 'text-gray-500 hover:text-white'
    }`}
  >
    <Bookmark className="h-5 w-5" />
    <span>Saved</span>

    {isAuthenticated && bookmarkCount > 0 && (
      <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[9px] font-bold text-white">
        {bookmarkCount > 9 ? '9+' : bookmarkCount}
      </span>
    )}
  </Link>
    </div>
  );
};

export default BottomNavbar;