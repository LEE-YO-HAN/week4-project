import { useState } from "react";
import { todayDate } from "../util/todayDate";
import { FormEvent, InputEvent, AddData, FormData } from "../type";
import {
  addComments,
  updateComments,
  deleteComments,
} from "../redux/commentSlice";

export const useForm = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  // form action && paging
  const [activePage, setActivePage] = useState<number>(1);
  const handlePageChange = (page: number) => {
    setActivePage(page);
  };
  const forcePageChange = () => {
    setActivePage(0);
    setTimeout(() => {
      setActivePage(1);
    }, 50);
  };

  const [formData, setFormData] = useState<FormData>({
    profile_url: "",
    author: "",
    content: "",
    createdAt: todayDate(),
  });

  const initFormData: AddData = {
    profile_url: "",
    author: "",
    content: "",
    createdAt: todayDate(),
  };

  const onChangeHandler = (e: InputEvent) => {
    let type = e.target.name;
    let value = e.target.value;
    if (type === "profile_url")
      setFormData((prev) => ({ ...prev, profile_url: value }));
    if (type === "author") setFormData((prev) => ({ ...prev, author: value }));
    if (type === "content")
      setFormData((prev) => ({ ...prev, content: value }));
  };

  const onSubmitHandler = async (e: FormEvent, dispatch: any) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateComments({ ...formData, id: editId }));
    } else {
      dispatch(addComments(formData));
      forcePageChange();
    }
    setFormData(initFormData);
  };

  const editHandler = (editStart: boolean, editId: number) => {
    setIsEdit(editStart);
    setEditId(editId);
  };

  const deleteHandler = (dispatch: any, deleteId: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(deleteComments(deleteId));
      forcePageChange();
    }
  };

  return {
    formData,
    setFormData,
    onChangeHandler,
    onSubmitHandler,
    initFormData,
    isEdit,
    editId,
    editHandler,
    deleteHandler,
    activePage,
    setActivePage,
    handlePageChange,
  };
};
