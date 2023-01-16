import axios from "axios";

export const base = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const commentsAPI = {
  getComments: (data: number) =>
    base.get(`/comments?_page=${data}&_limit=4&_order=desc&_sort=id`),
  addComment: (data: object) => base.post(`/comments`, data),
  getCommentDetail: (commentsId: number) => base.get(`/comments/${commentsId}`),
  updateComment: (data: object, commentsId: number) =>
    base.put(`/comments/${commentsId}`, data),
  deleteComment: (commentsId: number) => base.delete(`/comments/${commentsId}`),
};
