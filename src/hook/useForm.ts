import { useState } from "react";
import { todayDate } from "../util/todayDate";
import { FormEvent, InputEvent, AddData, UpdateData, FormData } from "../type";
import { addComments, updateComments } from "../redux/commentSlice";

export const useForm = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

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
    }
    console.log("ㅇㄹ");
    setFormData(initFormData);
  };
  console.log(formData);
  console.log(editId);
  console.log(isEdit);

  const editHandler = (editStart: boolean, editId: number) => {
    setIsEdit(editStart);
    setEditId(editId);
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
  };
};
