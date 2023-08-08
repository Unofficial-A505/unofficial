import customAxios from "../util/customAxios";

// 게시글별 댓글들 가져오기
const postCommentsApi = (postId) => customAxios({
  method: "get",
  url: `/api/comments/article/${postId}`,
}).then((res) => res.data.content)


// 게시글별 댓글 생성 ( 댓글 & 대댓글 )
const postCommentCreateApi = (articleId, content, parentId, nickName) => customAxios({
  method: "post",
  url: `/api/comments`,
  data: { articleId, content, parentId, nickName },
})

// 게시글별 댓글 수정
const postCommentUpdateApi = (id, articleId, content, parentId, nickName) => customAxios({
  method: "put",
  url: `/api/comments/${id}`,
  data: { id, articleId, content, parentId, nickName },
})

// 게시글별 댓글 삭제
const postCommentDeleteApi = (id) => customAxios({
  method: "delete",
  url: `/api/comments/${id}`,
})

export { postCommentsApi, postCommentCreateApi, postCommentUpdateApi, postCommentDeleteApi }
