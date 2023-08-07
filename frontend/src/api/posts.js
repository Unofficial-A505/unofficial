import customAxios from "../util/customAxios";

// 게시글 상세 정보 가져오기
const postDetailApi = (postId) => customAxios({
  method: "get",
  url: `/api/articles/${postId}`,
}).then((res) => res.data)


// 게시글 등록시 이미지 formData 전송
const postImageApi = (formData) => customAxios({
  method: "post",
  url: `/api/articles/image`,
  data: formData,
  headers: { "Content-Type": "multipart/form-data" },
})

// 게시글 등록
const postCreateApi = (title, content, boardName, nickName) => customAxios({
  method: "post",
  url: `/api/articles`,
  data: { title, content, boardName, nickName },
})

// 게시글 수정
const postUpdateApi = (postId, id, title, content, boardName, nickName) => customAxios({
    method: "put",
    url: `/api/articles/${postId}`,
    data: {id, title, content, boardName, nickName}
  })

// 게시글 삭제
const postDeleteApi = (postId) => customAxios({
  method: "delete",
  url: `/api/articles/${postId}`,
})

// 게시글 추천
const postRecommendInputApi = (articleId) => customAxios({
  method: "post",
  url: `/api/likes`,
  data: { articleId },
})

export { postDetailApi, postImageApi, postCreateApi, postUpdateApi, postDeleteApi, postRecommendInputApi }