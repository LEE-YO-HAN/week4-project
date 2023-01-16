import styled from "styled-components";
import { useEffect, useState } from "react";

interface childProps {
  activePage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  prevPageText: string;
  nextPageText: string;
  handlePageChange: (page: number) => void;
  maxItems: number;
}

export const Pagenation = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  prevPageText,
  nextPageText,
  handlePageChange,
  maxItems,
}: childProps) => {
  // paging button maxLength
  const totalLength =
    Math.ceil(totalItemsCount / itemsCountPerPage) < 1
      ? 1
      : Math.ceil(totalItemsCount / itemsCountPerPage);
  // buttons length change to array
  const pagingArray = Array.from(
    {
      length: totalLength,
    },
    (item, index) => index
  );

  // Whenever the current page changes
  // Set the number of pages in a group
  const [listNum, setListNum] = useState<number>(1);
  useEffect(() => {
    setListNum(Math.floor((activePage + maxItems - 1) / maxItems));
  }, [activePage]);

  // page number in this group
  const listNumIndex =
    listNum === 1
      ? Array.from(
          {
            length: maxItems,
          },
          (item, index) => {
            return index;
          }
        )
      : Array.from(
          {
            length: maxItems,
          },
          (item, index) => {
            return index + maxItems * (listNum - 1);
          }
        );

  return (
    <PagingUl>
      <li
        onClick={() => {
          if (activePage !== 1) {
            handlePageChange(activePage - 1);
          }
        }}
        style={
          activePage === 1
            ? { backgroundColor: "#e9e9e9" }
            : { backgroundColor: "none" }
        }
      >
        {prevPageText}
      </li>
      {pagingArray.map((item, index) => {
        if (
          listNumIndex[0] <= index &&
          index <= listNumIndex[listNumIndex.length - 1]
        ) {
          if (index + 1 === activePage) {
            return (
              <li
                key={item}
                id={`${index + 1}`}
                className="activePage"
                onClick={() => {
                  handlePageChange(index + 1);
                }}
              >
                {index + 1}
              </li>
            );
          } else {
            return (
              <li
                key={item}
                id={`${index + 1}`}
                onClick={() => {
                  handlePageChange(index + 1);
                }}
              >
                {index + 1}
              </li>
            );
          }
        }
      })}
      <li
        onClick={() => {
          if (activePage !== pagingArray.length) {
            handlePageChange(activePage + 1);
          }
        }}
        style={
          activePage === pagingArray.length
            ? { backgroundColor: "#e9e9e9" }
            : { backgroundColor: "none" }
        }
      >
        {nextPageText}
      </li>
    </PagingUl>
  );
};

const PagingUl = styled.ul`
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 300px;
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;

  & ul,
  li {
    list-style: none;
  }
  & li {
    width: 35px;
    height: 35px;
    text-align: center;
    font-size: 25px;
    border-radius: 5px;
    background-color: #e6e6e6;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: gray;
    }
  }
  & .activePage {
    color: white;
    background-color: gray;
  }

  & li:first-child,
  li:last-child {
    background-color: #e6e6e6;
    &:hover {
      color: #838383;
      background-color: gray;
    }
  }
`;
