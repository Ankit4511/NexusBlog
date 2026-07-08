import API from "./api";

// Get all comments
export const getComments = async (blogId) => {
  const { data } = await API.get(`/api/comments/${blogId}`);
  return data.comments;
};

// Add comment
export const addComment = async (
  blogId,
  text,
  parentComment = null
) => {
  const { data } = await API.post(
    `/api/comments/${blogId}`,
    {
      text,
      parentComment,
    }
  );

  return data.comment;
};

// Delete comment
export const deleteComment = async (commentId) => {
  const { data } = await API.delete(
    `/api/comments/${commentId}`
  );

  return data;
};

// Update comment
export const updateComment = async (
  commentId,
  text
) => {
  const { data } = await API.put(
    `/api/comments/${commentId}`,
    {
      text,
    }
  );

  return data.comment;
};

// Toggle Like
export const toggleCommentLike = async (
  commentId
) => {
  const { data } = await API.post(
    `/api/comments/like/${commentId}`
  );

  return data;
};