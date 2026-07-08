import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Share2, Check, Eye } from "lucide-react";
import ReadingProgress from "../components/blog/ReadingProgress";
import UserDetail from "../components/UserDetail";
import ArticleActions from "../components/blog/ArticleActions";
import AuthorCard from "../components/blog/AuthorCard";
import RelatedArticles from "../components/blog/RelatedArticles";
import { getAllBlogs, getBlogById } from "../services/blog.service";
import Comments from "../components/blog/Comments";
import { registerView, getViews } from "../services/view.service";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogData, blogs] = await Promise.all([
          getBlogById(id),
          getAllBlogs(),
        ]);

        setBlog(blogData);
        setRelatedBlogs(blogs);

        const viewData = await registerView(id);
        setViews(viewData.views);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-400">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-sm text-gray-400">Blog not found.</p>

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
    <>
      <ReadingProgress />
      <ArticleActions blogId={blog._id} />

      <div className="relative min-h-screen bg-brand-dark pb-24">
        {/* Hero */}
        <div className="relative h-72 w-full overflow-hidden md:h-96">
          <img
            src={blog.imgUrl}
            alt={blog.title}
            className="h-full w-full object-cover brightness-[0.4]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

          <div className="absolute left-4 top-6 z-20 sm:left-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black/60"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto -mt-24 max-w-3xl px-4 sm:px-6">
          <article className="rounded-2xl border border-white/[0.06] bg-brand-card/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              {blog.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-white/[0.05] py-4">
              <div className="flex items-center gap-3">
                <UserDetail user={blog.user} />

                <span className="text-gray-600">•</span>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{views} Views</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-2 text-xs font-semibold transition-colors ${
                  copied ? "text-emerald-400" : "text-gray-400 hover:text-white"
                }`}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}

                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            <div className="mt-8">
              <p className="whitespace-pre-line text-[17px] leading-8 text-gray-300">
                {blog.description}
              </p>

              <div className="mt-10">
                <AuthorCard
                  author={{
                    _id: blog?.user?._id,
                    name: blog?.user?.name || "Unknown Author",
                    email: blog?.user?.email || "Not Available",
                  }}
                />
                <Comments blogId={blog._id} />
              </div>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-4">
          <RelatedArticles blogs={relatedBlogs} currentBlogId={blog._id} />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
