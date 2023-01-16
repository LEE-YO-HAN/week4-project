import axios from "axios";
import { AddData, UpdateData } from "../type";

export const base = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const commentsAPI = {
  getCommentsAll: () => base.get(`comments`),
  getComments: (data: number) =>
    base.get(`/comments?_page=${data}&_limit=4&_order=desc&_sort=id`),
  addComment: (data: AddData) => base.post(`/comments`, data),
  getCommentDetail: (commentsId: number) => base.get(`/comments/${commentsId}`),
  updateComment: (data: UpdateData, commentsId: number) =>
    base.put(`/comments/${commentsId}`, data),
  deleteComment: (commentsId: number) => base.delete(`/comments/${commentsId}`),
};
