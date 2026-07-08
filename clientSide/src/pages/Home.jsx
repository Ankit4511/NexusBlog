import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context.jsx";
import UserDetail from "../components/UserDetail";
import { BookOpen, ArrowRight, Sparkles, Clock, SearchX } from "lucide-react";
import HeroSection from "../components/HeroSection.jsx";
import BlogCard from "../components/BlogCard";
import LatestInsights from "../components/LatestInsights";
import { getAllBlogs } from '../services/blog.service';
import LikeButton from "../components/LikeButton";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const auth = useContext(Context);

  useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const blogs = await getAllBlogs();
      setBlog(blogs);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  fetchBlogs();
}, []);

  const query = auth.searchQuery?.trim().toLowerCase() || "";

  const filteredBlog = query
    ? blog.filter(
        (b) =>
          b.title?.toLowerCase().includes(query) ||
          b.description?.toLowerCase().includes(query),
      )
    : blog;

  const featured = !query ? filteredBlog[0] : null;
  const rest = !query ? filteredBlog.slice(1) : filteredBlog;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero: Featured Post */}
      <HeroSection featured={featured} />

      {/* Grid of all posts */}
      <LatestInsights
        blogs={filteredBlog}
        query={query}
        searchQuery={auth.searchQuery}
      />
    </div>
  );
};

export default Home;
