import API from "./api";

export const toggleBookmark = async (blogId) => {
  const { data } = await API.post(`/api/bookmarks/${blogId}`);
  return data;
};
 
export const getBookmarkStatus = async (blogId) => {
  const { data } = await API.get(`/api/bookmarks/${blogId}`);
  return data.bookmarked;
};
 
export const getMyBookmarks = async () => {
  const { data } = await API.get(`/api/bookmarks`);
  return data.blogs;
};