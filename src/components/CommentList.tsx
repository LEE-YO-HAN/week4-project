import styled from "styled-components";
import { useState, useEffect } from "react";
import { getComments } from "../redux/commentSlice";
import { UpdateData } from "../type";
import { baseImage } from "../util/baseImage";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { useForm } from "../hook/useForm";

interface childProps {
  isEdit: boolean;
  editId: number;
  editHandler: (editStart: boolean, editId: number) => void;
}

export const CommentList = ({ isEdit, editId, editHandler }: childProps) => {
  const dispatch = useAppDispatch();
  const commentListData = useAppSelector(
    (state) => state.commentSlice.comments
  );

  //   const { isEdit, editId, editHandler } = useForm();

  const [activePage, setActivePage] = useState<number>(1);
  useEffect(() => {
    dispatch(getComments(activePage));
  }, [activePage, dispatch]);

  console.log(commentListData);

  return (
    <>
      {commentListData?.map((item: UpdateData, index: number) => (
        <Comment key={index}>
          <img
            src={!item.profile_url ? baseImage(item.id) : item.profile_url}
            alt="프로필 사진"
          />
          {item.author}
          <CreatedAt>{item.createdAt}</CreatedAt>
          <Content>{item.content}</Content>
          <Button>
            {isEdit && editId === item.id ? (
              <span onClick={() => editHandler(false, item.id)}>취소</span>
            ) : (
              <span onClick={() => editHandler(true, item.id)}>수정</span>
            )}
            <span>삭제</span>
          </Button>
          <hr />
        </Comment>
      ))}
    </>
  );
};

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;
  & img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & span {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
