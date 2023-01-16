import styled from "styled-components";
import { useState, useEffect } from "react";
import { getComments, getCommentsAll } from "../redux/commentSlice";
import { UpdateData } from "../type";
import { baseImage } from "../util/baseImage";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { Pagenation } from "./Pagenation";
import { FormData } from "../type";

interface childProps {
  isEdit: boolean;
  editId: number;
  editHandler: (editStart: boolean, editId: number) => void;
  deleteHandler: (dispatch: any, deleteId: number) => void;
}

export const CommentList = ({
  isEdit,
  editId,
  editHandler,
  deleteHandler,
}: childProps) => {
  const dispatch = useAppDispatch();
  const commentListData = useAppSelector(
    (state) => state.commentSlice.comments
  );

  // 현재 페이지 데이터
  const [pagingDataSet, setPagingDataSet] = useState<FormData[]>([]);

  // 현재 페이지 설정
  const [activePage, setActivePage] = useState<number>(1);
  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  useEffect(() => {
    dispatch(getCommentsAll());
    // dispatch(getComments(activePage));
  }, [activePage, dispatch]);

  console.log(commentListData);

  // 인덱스 배열을 만들어 페이지별 순서 생성(숫자12는 page per items)
  let pagePerItems = 4;
  let indexArray = Array.from({ length: pagePerItems }, (item, index) => {
    return index;
  });
  let pageIndex: number[] = [];
  pageIndex =
    activePage === 1
      ? indexArray
      : indexArray.map((item) => item + (activePage - 1) * pagePerItems);

  // 현재 페이지 데이터
  const pagingData: FormData[] = [];
  const dataFetching = () => {
    for (let i = 0; i < indexArray.length; i++) {
      if (commentListData && commentListData[pageIndex[i]] === undefined) {
        break;
      } else {
        pagingData.push(commentListData[pageIndex[i]]);
      }
    }
    setPagingDataSet(pagingData);
  };

  useEffect(() => {
    // if (commentListData !== []) {
    dataFetching();
    // }
  }, [activePage]);

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
            <span onClick={() => deleteHandler(dispatch, item.id)}>삭제</span>
          </Button>
          <hr />
        </Comment>
      ))}
      <Pagenation
        activePage={activePage}
        itemsCountPerPage={pagePerItems}
        totalItemsCount={commentListData?.length}
        prevPageText={"<"}
        nextPageText={">"}
        handlePageChange={handlePageChange}
        maxItems={5}
      />
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
