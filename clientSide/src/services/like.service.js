import API from "./api";

export const getLikeStatus = async (blogId) => {
  const { data } = await API.get(`/api/likes/${blogId}`);
  return data;
};

export const toggleLike = async (blogId) => {

    console.log(document.cookie);
    
  const { data } = await API.post(`/api/likes/${blogId}`);
  return data;
};