import API from './api';

export const loginUser = async (userData) => {
  const { data } = await API.post('/api/users/login', userData);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await API.post('/api/users/register', userData);
  return data;
};

export const logoutUser = async () => {
  const { data } = await API.get('/api/users/logout');
  return data;
};

export const getProfile = async () => {
  const { data } = await API.get('/api/users/myprofile');
  return data.user;
};

export const getUserById = async (id) => {
  const { data } = await API.get(`/api/users/${id}`);
  return data.user;
};

// Public author profile (name, bio, socials, followers/following/blogs count)
export const getUserProfile = async (id) => {
  const { data } = await API.get(`/api/users/${id}`);
  return data.user;
};

// All blogs written by a specific author
export const getUserBlogs = async (id) => {
  const { data } = await API.get(`/api/blogs/user/${id}`);
  return data.blogs;
};

export const forgotPassword = async (email) => {
  const {data} = await API.post('/api/users/forgot-password',{email});
  return data;
}

export const resetPassword = async (token, password) => {
  const {data} = await API.put(`/api/users/reset-password/${token}`, {password});
  return data;
}