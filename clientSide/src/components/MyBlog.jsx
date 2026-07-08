import { useContext, useEffect, useState } from 'react';
import UserDetail from '../components/UserDetail';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Edit3, Trash2, FileText, AlertCircle } from 'lucide-react';
import {
  getMyBlogs,
  deleteBlog as deleteBlogService,
} from '../services/blog.service';


const MyBlog = () => {
  const [blog, setBlog] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const blogs = await getMyBlogs();
      setBlog(blogs);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  fetchBlogs();
}, []);

  const deleteBlog = async (id) => {
  try {
    const response = await deleteBlogService(id);

    toast.success(response.message, {
      position: 'top-center',
      autoClose: 1500,
      theme: 'dark',
      transition: Bounce,
    });

    setBlog((prev) => prev.filter((item) => item._id !== id));
  } catch (error) {
    console.error('Failed to delete blog:', error);

    toast.error('Failed to delete blog');
  }
};

  const editBlog = (id) => {
    navigate(`/edit-blog/${id}`);
};

  const viewBlog = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        theme="dark"
        transition={Bounce}
      />

      <div className="rounded-2xl border border-white/[0.06] bg-brand-card p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4.5">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-white">
              My Blogs
            </h3>
            <p className="text-xs text-gray-400">
              Manage and maintain your published articles
            </p>
          </div>

          <span className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-gray-400 font-bold border border-white/[0.04]">
            {blog.filter((b) => b.status !== 'draft').length} published • {blog.filter((b) => b.status === 'draft').length} draft
          </span>
        </div>

        {blog.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-500 stroke-[1.5]" />

            <h4 className="text-sm font-semibold text-white mt-4">
              No posts created yet
            </h4>

            <p className="text-xs text-gray-400 mt-1.5 max-w-sm mx-auto">
              You haven't written any articles yet. Get started and share your
              knowledge with the community!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04] mt-1">
            {blog.map((data) => (
              <div
                key={data._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4.5 gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={data.imgUrl}
                    alt={data.title}
                    className="h-14 w-20 rounded-lg object-cover bg-neutral-800 border border-white/[0.06] flex-shrink-0"
                  />

                  <div className="space-y-1.5">
                    <h4
                      onClick={() => viewBlog(data._id)}
                      className="font-semibold text-sm leading-tight text-white cursor-pointer transition-colors hover:text-purple-400"
                    >
                      {data.title}
                      <span
                        className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide align-middle ${
                          data.status === 'draft'
                            ? 'bg-amber-500/15 text-amber-400'
                            : 'bg-emerald-500/15 text-emerald-400'
                        }`}
                      >
                        {data.status === 'draft' ? 'Draft' : 'Published'}
                      </span>
                    </h4>

                    <p className="text-xs text-gray-400 line-clamp-1 max-w-md">
                      {data.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 font-medium">
                      <span>
                        {new Date(data.createdAt).toLocaleDateString()}
                      </span>

                      <span>•</span>

                      <UserDetail user={data.user} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => editBlog(data._id)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2 text-xs font-semibold text-gray-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-blue-400" />
                    Edit
                  </button>

                  <button
                    onClick={() => setShowConfirmDelete(data._id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/15 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {showConfirmDelete === data._id && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-brand-card p-6 shadow-2xl">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 mb-4">
                        <AlertCircle className="h-5 w-5" />
                      </div>

                      <h4 className="text-lg font-bold text-white">
                        Delete post?
                      </h4>

                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        Are you sure you want to delete{' '}
                        <span className="text-white font-medium">
                          "{data.title}"
                        </span>
                        ? This action is permanent and cannot be undone.
                      </p>

                      <div className="flex justify-end gap-2.5 mt-5">
                        <button
                          onClick={() => setShowConfirmDelete(null)}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/[0.06] transition-colors"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => {
                            deleteBlog(data._id);
                            setShowConfirmDelete(null);
                          }}
                          className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBlog;