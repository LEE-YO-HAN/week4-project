import styled from "styled-components";
import { useEffect } from "react";
import { todayDate } from "../util/todayDate";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { FormData, FormEvent, InputEvent } from "../type";

interface childProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onChangeHandler: (e: InputEvent) => void;
  onSubmitHandler: (e: FormEvent, dispatch: any) => void;
  initFormData: FormData;
  isEdit: boolean;
  editId: number;
}

export const Form = ({
  formData,
  setFormData,
  onChangeHandler,
  onSubmitHandler,
  initFormData,
  isEdit,
  editId,
}: childProps) => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.commentSlice);

  useEffect(() => {
    if (isEdit) {
      const editComment = comments.filter((item) => item.id === editId)[0];
      setFormData(editComment);
    } else {
      setFormData(initFormData);
    }
  }, [isEdit]);

  return (
    <Container onSubmit={(e) => onSubmitHandler(e, dispatch)}>
      <input
        type="text"
        name="profile_url"
        placeholder="https://picsum.photos/id/1/50/50 - 필수 X"
        value={formData.profile_url}
        onChange={(e) => onChangeHandler(e)}
      />
      <br />
      <input
        type="text"
        name="author"
        placeholder="작성자"
        value={formData.author}
        onChange={(e) => onChangeHandler(e)}
        required
      />
      <br />
      <textarea
        name="content"
        placeholder="내용"
        value={formData.content}
        onChange={(e) => onChangeHandler(e)}
        required
      ></textarea>
      <br />
      <input
        type="text"
        name="createdAt"
        placeholder={`${todayDate()}`}
        disabled
        required
      />
      <br />
      <button type="submit">{isEdit ? "수정하기" : "등록"}</button>
    </Container>
  );
};

const Container = styled.form`
  padding: 0 10px;
  margin-bottom: 50px;
  & textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & input[type="text"] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: lightgray;
    }
  }
`;
