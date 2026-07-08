import API from './api';

export const toggleFollow = async (userId) => {
  const { data } = await API.post(`/api/follow/${userId}`);
  return data;
};

export const getFollowStatus = async (userId) => {
  const { data } = await API.get(`/api/follow/status/${userId}`);
  return data.following;
};

export const getFollowers = async (userId) => {
  const { data } = await API.get(`/api/follow/followers/${userId}`);
  return data.followers;
};

export const getFollowing = async (userId) => {
  const { data } = await API.get(`/api/follow/following/${userId}`);
  return data.following;
};