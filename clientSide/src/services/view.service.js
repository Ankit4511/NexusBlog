import API from "./api";

// Register a new view
export const registerView = async (blogId) => {
  const { data } = await API.post(`/api/views/${blogId}`);
  return data;
};

// Get total views
export const getViews = async (blogId) => {
  const { data } = await API.get(`/api/views/${blogId}`);
  return data;
};