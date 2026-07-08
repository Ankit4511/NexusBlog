import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { getProfile } from "../services/auth.service";
import { getMyBookmarks } from "../services/Bookmark.service";

const AuthProvider = ({ children }) => {
  const auth = useContext(Context);

  const [loading, setLoading] = useState(true);
  const { setUser, setIsAuthenticated, setBookmarkCount } = auth;

  useEffect(() => {
    const checkLogin = async () => {
      console.log("========== AUTH PROVIDER ==========");

      try {
        console.log("Checking Login...");

        const user = await getProfile();

        console.log("USER RECEIVED:", user);

        setUser(user);
        setIsAuthenticated(true);

        console.log("AUTH TRUE");

        // Fetch saved-blogs count for the bottom nav badge
        try {
          const blogs = await getMyBookmarks();
          setBookmarkCount(blogs.length);
        } catch {
          setBookmarkCount(0);
        }
      } catch (err) {
        console.log("AUTH FALSE");

        setUser(null);
        setIsAuthenticated(false);
        setBookmarkCount(0);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [setUser, setIsAuthenticated, setBookmarkCount]);

  if (loading) {
    return null;
  }

  return children;
};

export default AuthProvider;