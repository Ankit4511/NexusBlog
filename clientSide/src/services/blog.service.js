import API from './api';

/* ---------------- Blogs ---------------- */

export const getAllBlogs = async () => {
  const { data } = await API.get('/api/blogs/allblogs');
  return data.blogs;
};

export const getBlogById = async (id) => {
  const { data } = await API.get(`/api/blogs/blog/${id}`);
  return data.blog;
};

export const getMyBlogs = async () => {
  const { data } = await API.get('/api/blogs/myblogs');
  return data.blogs;
};

export const createBlog = async (blogData) => {
  const { data } = await API.post('/api/blogs/create', blogData);
  return data;
};

export const updateBlog = async (id, blogData) => {
  const { data } = await API.put(`/api/blogs/${id}`, blogData);
  return data;
};

export const deleteBlog = async (id) => {
  const { data } = await API.delete(`/api/blogs/${id}`);
  return data;
};