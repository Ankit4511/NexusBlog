import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

import { createBlog, updateBlog, getBlogById } from "../services/blog.service";

import Breadcrumb from "../components/editor/Breadcrumb";
import EditorHeader from "../components/editor/EditorHeader";
import EditorForm from "../components/editor/EditorForm";
import EditorSidebar from "../components/editor/EditorSidebar";
import PublishActions from "../components/editor/PublishActions";
import PreviewCard from "../components/editor/PreviewCard";

const AddBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Programming");
  const [tags, setTags] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [publishImmediately, setPublishImmediately] = useState(true);

  const [previewMode, setPreviewMode] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);

        setTitle(blog.title);
        setDescription(blog.description);
        setImgUrl(blog.imgUrl);
        setPublishImmediately(blog.status !== "draft");
      } catch (error) {
        console.error(error);

        toast.error("Failed to load blog.", {
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      }
    };

    fetchBlog();
  }, [id]);

  const handlePublish = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and content are required.", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setPublishing(true);

    const status = publishImmediately ? "published" : "draft";

    try {
      let response;

      if (!id) {
        response = await createBlog({ title, description, imgUrl, status });
      } else {
        response = await updateBlog(id, { title, description, imgUrl, status });
      }

      toast.success(response.message, {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        theme="dark"
        transition={Bounce}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 pb-24">
        <Breadcrumb />

        <EditorHeader
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          isEdit={Boolean(id)}
          onCancel={handleCancel}
          onPublish={handlePublish}
          publishing={publishing}
        />

        {previewMode ? (
          <PreviewCard
            title={title}
            subtitle={subtitle}
            description={description}
            imgUrl={imgUrl}
            category={category}
            tags={tags}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <EditorForm
                title={title}
                setTitle={setTitle}
                subtitle={subtitle}
                setSubtitle={setSubtitle}
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
                description={description}
                setDescription={setDescription}
              />
            </div>

            <div className="lg:col-span-1 space-y-6">
              <EditorSidebar
                imgUrl={imgUrl}
                category={category}
                setCategory={setCategory}
                tags={tags}
                setTags={setTags}
                description={description}
              />

              <PublishActions
                metaDescription={metaDescription}
                setMetaDescription={setMetaDescription}
                publishImmediately={publishImmediately}
                setPublishImmediately={setPublishImmediately}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddBlog;