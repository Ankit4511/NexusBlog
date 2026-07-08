import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Context from "../context/Context.jsx";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Search,
  PenSquare,
  Bell,
  LogIn,
  LogOut,
  BarChart3,
  LayoutDashboard,
  Compass,
  Menu,
  X,
  Bookmark,
} from "lucide-react";

const Navbar = () => {
  const auth = useContext(Context);
  console.log("NAVBAR:", auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Welcome to NexusBlog! Start writing your first post.",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const isActive = (path) => location.pathname === path;

  const avatarUrl = auth.user?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        auth.user.name,
      )}&background=8b5cf6&color=fff&bold=true`
    : "";

  const logOut = async () => {
    try {
      const api = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      toast.success(api.data.message);

      setTimeout(() => {
        auth.setIsAuthenticated(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (value) => {
    auth.setSearchQuery(value);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-brand-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            onClick={() => auth.setSearchQuery("")}
            className="flex cursor-pointer items-center gap-2.5 active:scale-95 transition-transform"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 shadow-lg shadow-purple-500/20">
              <span className="font-display text-lg font-bold text-white">
                N
              </span>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 opacity-30 blur-sm animate-pulse-glow"></div>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Nexus
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Blog
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              to="/"
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-white/[0.06] text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <Compass className="h-4 w-4" />
              Explore
            </Link>
            {auth.isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive("/profile")
                      ? "bg-white/[0.06] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/analytics"
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive("/analytics")
                      ? "bg-white/[0.06] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Center: Search */}
        <div className="hidden sm:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, topics, or authors..."
              value={auth.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-full border border-white/[0.08] bg-white/[0.04] py-2 pl-11 pr-4 text-sm text-white placeholder-gray-400 outline-none transition-all focus:border-purple-500/40 focus:bg-white/[0.07] focus:ring-2 focus:ring-purple-500/10"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigate("/");
              const el = document.getElementById("mobile-search-input");
              if (el) el.focus();
            }}
            className="sm:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.04]"
          >
            <Search className="h-5 w-5" />
          </button>

          {auth.isAuthenticated ? (
            <>
              <Link
                to="/addblog"
                className="hidden sm:flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-500/10 transition-all hover:opacity-95 active:scale-95"
              >
                <PenSquare className="h-4 w-4" />
                Write Post
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2.5 w-80 rounded-xl border border-white/[0.08] bg-brand-card p-2 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/[0.04] px-3 py-2 text-xs text-gray-400 font-semibold">
                      <span>Notifications ({unreadCount})</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto mt-1 space-y-1">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-lg text-sm transition-colors cursor-pointer ${
                            notif.read
                              ? "text-gray-400 hover:bg-white/[0.02]"
                              : "text-white bg-white/[0.03] hover:bg-white/[0.05]"
                          }`}
                        >
                          {notif.message}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 rounded-full border border-white/[0.08] p-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                >
                  <img
                    src={avatarUrl}
                    alt={auth.user?.name}
                    className="h-8 w-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-xl border border-white/[0.08] bg-brand-card p-1.5 shadow-2xl ring-1 ring-black/5">
                    <div className="px-3.5 py-2.5 border-b border-white/[0.04] mb-1">
                      <p className="text-sm font-semibold text-white leading-none">
                        {auth.user?.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 leading-none truncate">
                        {auth.user?.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/profile");
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/[0.04] hover:text-white transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-purple-400" />
                      Author Dashboard
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/analytics");
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/[0.04] hover:text-white transition-colors"
                    >
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                      Analytics
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/saved");
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/[0.04] hover:text-white transition-colors"
                    >
                      <Bookmark className="h-4 w-4 text-yellow-400" />
                      Saved Blogs
                      {auth.bookmarkCount > 0 && (
                        <span className="ml-auto rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] font-semibold text-gray-300">
                          {auth.bookmarkCount}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/addblog");
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/[0.04] hover:text-white transition-colors sm:hidden"
                    >
                      <PenSquare className="h-4 w-4 text-blue-400" />
                      Write Post
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logOut();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg bg-white/[0.06] border border-white/[0.08] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/[0.1] hover:border-white/[0.15] active:scale-95"
            >
              <LogIn className="h-4 w-4 text-purple-400" />
              Sign In
            </Link>
          )}

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.04]"
          >
            {showMobileMenu ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-white/[0.04] bg-brand-dark px-4 py-4 space-y-3 shadow-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search articles..."
              value={auth.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 outline-none"
            />
          </div>

          <div className="space-y-1.5 pt-1">
            <Link
              to="/"
              onClick={() => setShowMobileMenu(false)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/[0.04] hover:text-white"
            >
              <Compass className="h-5 w-5 text-purple-400" />
              Explore Feed
            </Link>
            {auth.isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/[0.04] hover:text-white"
                >
                  <LayoutDashboard className="h-5 w-5 text-blue-400" />
                  Dashboard
                </Link>
                <Link
                  to="/analytics"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/[0.04] hover:text-white"
                >
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  Analytics
                </Link>
                <Link
                  to="/saved"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/[0.04] hover:text-white"
                >
                  <Bookmark className="h-5 w-5 text-yellow-400" />
                  Saved Blogs
                </Link>
                <Link
                  to="/addblog"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/[0.04] hover:text-white"
                >
                  <PenSquare className="h-5 w-5 text-emerald-400" />
                  Write New Post
                </Link>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    logOut();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 hover:bg-rose-500/10"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
