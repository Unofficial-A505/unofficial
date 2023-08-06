import customAxios from "../util/customAxios";

// 게시글별 댓글들 가져오기
const postCommentsApi = (postId) => customAxios({
  method: "get",
  url: `${process.env.REACT_APP_SERVER}/api/comments/article/${postId}`,
}).then((res) => res.data)


// 게시글별 댓글 생성
const postCommentCreateApi = (articleId, content, parentId, nickName) => customAxios({
  method: "post",
  url: `${process.env.REACT_APP_SERVER}/api/comments`,
  data: { articleId, content, parentId, nickName },
})

// 게시글별 댓글 수정
const postCommentUpdateApi = (id, articleId, content, parentId) => customAxios({
  method: "put",
  url: `${process.env.REACT_APP_SERVER}/api/comments/${id}`,
  data: { id, articleId, content, parentId },
})

// 게시글별 댓글 삭제
const postCommentDeleteApi = (id) => customAxios({
  method: "delete",
  url: `${process.env.REACT_APP_SERVER}/api/comments/${id}`,
})

export { postCommentsApi, postCommentCreateApi, postCommentUpdateApi, postCommentDeleteApi }
