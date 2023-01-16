import styled from "styled-components";
import { useEffect } from "react";
import { getComments, getCommentsAll } from "../redux/commentSlice";
import { UpdateData } from "../type";
import { baseImage } from "../util/baseImage";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { Pagenation } from "./Pagenation";

interface childProps {
  isEdit: boolean;
  editId: number;
  editHandler: (editStart: boolean, editId: number) => void;
  deleteHandler: (dispatch: any, deleteId: number) => void;
  activePage: number;
  handlePageChange: (page: number) => void;
}

export const CommentList = ({
  isEdit,
  editId,
  editHandler,
  deleteHandler,
  activePage,
  handlePageChange,
}: childProps) => {
  const dispatch = useAppDispatch();
  const { comments, maxDataLength } = useAppSelector(
    (state) => state.commentSlice
  );

  useEffect(() => {
    dispatch(getCommentsAll());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getComments(activePage));
  }, [activePage]);

  return (
    <>
      <Container>
        {comments?.map((item: UpdateData, index: number) => {
          return (
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
                  <span
                    id="ActiveEdit"
                    onClick={() => editHandler(false, item.id)}
                  >
                    취소
                  </span>
                ) : (
                  <span onClick={() => editHandler(true, item.id)}>수정</span>
                )}
                <span onClick={() => deleteHandler(dispatch, item.id)}>
                  삭제
                </span>
              </Button>
              <hr />
            </Comment>
          );
        })}
      </Container>
      <Pagenation
        activePage={activePage}
        itemsCountPerPage={4}
        totalItemsCount={maxDataLength}
        prevPageText={"<"}
        nextPageText={">"}
        handlePageChange={handlePageChange}
        maxItems={5}
      />
    </>
  );
};

const Container = styled.div`
  min-height: 600px;
`;

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
    background-color: white;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: lightgray;
    }
  }
  & #ActiveEdit {
    background-color: lightgray;
  }
`;
