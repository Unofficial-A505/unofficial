import customAxios from "../util/customAxios";

// best 게시글
const bestPostsApi =  customAxios({
  method: "get",
  url: `${process.env.REACT_APP_SERVER}/api/best`,
}).then((res) => res.data)


// boardName 리스트
const boardNamesApi = customAxios({
  method: "get",
  url: `${process.env.REACT_APP_SERVER}/api/boards`,
}).then((res) => res.data)


// 전체 board 게시글
const boardArticlesAll = customAxios({
  method: "get",
  url: `${process.env.REACT_APP_SERVER}/api/articles`,
}).then((res) => res.data.content)


// 각 board 별 게시글


// 게시글 키워드 검색 (전체 & 게시판 별)
const searchViewApi = (keyword, boardId) => customAxios({
  method: "get",
  url: `${process.env.REACT_APP_SERVER}/api/articles/search?keyword=${keyword}&boardId=${boardId}`,
}).then((res) => res.data.content)

export { bestPostsApi, boardNamesApi, boardArticlesAll, searchViewApi }