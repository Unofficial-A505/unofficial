/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./PostUpdate.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { postUpdateApi, postImageApi } from "../../api/posts";
import useDocumentTitle from "../../useDocumentTitle";

import Quill from "quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@looop/quill-image-resize-module-react";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

Quill.register("modules/ImageResize", ImageResize);

const PostUpdate = () => {
  useDocumentTitle("게시글 수정");

  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const accessToken = authUser.accessToken;

  useEffect(() => {
    if (!accessToken) {
      alert("로그인 후에 사용해 주세요.");
      navigate("/");
      return;
    }
  }, []);


  const [limit, setLimit] = useState(false); 
  const [size, setSize] = useState();

  const handleLimit = (e) => {
    const size = new Blob([e]).size 
    setSize(size)
  
    if (size <= 4500) {
      setLimit(false);
    } else {
      setLimit(true);
      quillElement.current.editor.root.innerHTML = quillElement.current.editor.root.innerHTML.substring(0, 4505);
    }
  }

  const { boardId } = useParams();
  const { postId } = useParams();
  const { state: postDetail } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const TitleElement = useRef(null);
  const quillElement = useRef(null);
  const [imageList, setimageList] = useState([]);

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        // [
        //   { align: "" },
        //   { align: "center" },
        //   { align: "right" },
        //   { align: "justify" },
        // ],
        ["link", "image"],
      ],
    },
    ImageResize: { modules: ["Resize"] },
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
  ];

  useEffect(() => {
    const editor = document.querySelector(".ql-editor");
    if (editor) {
      editor.classList.add("fs-5");
    }
  }, []);

  useEffect(() => {
    const delta = quillElement.current.editor.clipboard.convert(
      postDetail.content
    );
    quillElement.current.editor.setContents(delta, "silent");
  }, []);

  useEffect(() => {
    quillElement.current.editor
      .getModule("toolbar")
      .addHandler("image", function () {
        selectLocalImage();
      });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [imageList]);

  const handleTabDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      window.document.querySelector(".ql-editor").focus();
    }
  };

  const handleShiftTabDown = (event) => {
    if (event.key === "Tab" && event.shiftKey) {
      event.preventDefault();
      window.document.querySelector("#inputTitle").focus();
    }
  };

  const changeImageList = (url, file) => {
    setimageList([...imageList, { url, file }]);
  };

  // 이미지 url 추출 함수
  function selectLocalImage() {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    // console.log("input.type " + fileInput.type);

    fileInput.click();

    fileInput.addEventListener("change", function (e) {
      // change 이벤트로 input 값이 바뀌면 실행
      e.preventDefault();
      // editor에 새로운 이미지 삽입
      const fileURL = window.URL.createObjectURL(e.target.files[0]);
      const file = fileInput.files[0];
      const Image = Quill.import("formats/image");
      // console.log('image file', fileURL, file)
      Image.sanitize = (fileURL) => fileURL;
      // console.log('fileURL', fileURL)

      // const range = quillElement.current.editor.getSelection();
      quillElement.current.editor.insertEmbed(
        quillElement.current.editor.root,
        "image",
        `${fileURL}`
      );

      // 이미지 로컬 url 및 formData 담을 file ImageList에 담기
      changeImageList(fileURL, file);
    });
  }

  // 새로 첨부된 이미지 formData에 담아서 전송
  function sendformData() {
    let content = quillElement.current.editor.root.innerHTML;
    if (content == "<p><br></p>") {
      alert("내용을 입력하세요!");
    } else {
      return new Promise(function (resolve, reject) {
        // let content = quillElement.current.editor.root.innerHTML;
        // console.log(imageList)
        const imagePromises = [];

        //글 등록하는 현재 content에 존재하는 image만 formData에 싣기
        imageList.forEach((image) => {
          let regexOne = new RegExp(`${image.url}`);
          let imageString = String(regexOne);
          imageString = imageString.replace(/\\/g, "");

          const imageChecked = content.match(regexOne);

          if (imageChecked) {
            // formData에 해당 이미지 싣기
            const formData = new FormData();
            formData.append("uploadFile", image.file);

            const promise = postImageApi(formData)
              .then((res) => {
                // console.log('image', res.url)
                // console.log("success");
                const uploadPath = res.data;
                content = content.replace(regexOne, `${uploadPath}`);
                // console.log('change source', content)
                // quillElement.current.editor.insertEmbed(quillElement.current.editor.root, "image", `${uploadPath}`);

                window.URL.revokeObjectURL(image.url);
              })
              .catch((err) => console.log(err));

            imagePromises.push(promise);
          }
        });
        Promise.all(imagePromises)
          .then(() => resolve(content))
          .catch((err) => reject(err));
      });
    }
  }

  // content 수정한 내용 수정하는 PUT 요청
  function sendPost(content) {
    return new Promise(function (resolve, reject) {
      const title = TitleElement.current.value;
      const boardName = postDetail.boardName;
      const nickName = postDetail.nickName;
      const id = postId;

      postUpdateApi(postId, id, title, content, boardName, nickName)
        .then(() => navigate(`/boards/${boardId}/${postId}`, { replace: true }))
        .catch((err) => console.log(err));
    });
  }

  const updateRequest = () => {
    const titleTest = TitleElement.current.value;
    let contentTest = quillElement.current.editor.root.innerHTML;
    // console.log(contentTest)
    if (!titleTest) {
      alert("제목을 입력해주세요!");
    } else if (contentTest == "<p><br></p>") {
      alert("내용을 입력하세요!");
    } else {
      updatePost();
    }
  };

  // 글 수정 PUT 요청 (sendformData -> sendPost)
  async function updatePost() {
    const title = TitleElement.current.value;
    if (!title) {
      alert("제목을 입력해주세요!");
    } else {
      try {
        setIsLoading(true);
        const content = await sendformData();
        // console.log("sendformData completed");
        await sendPost(content);
        // console.log("sendPost completed");
      } catch (err) {
        console.error("Error in createPost:", err);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    }
  }

  // 이외 함수들
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div className={styles.craetecontainer}>
        <div className={styles.topmenu}>
          <h3 className={styles.topmenuBox}>
            <p className={styles.boardTitle}>{postDetail.boardName}</p>
            <p>글 수정</p>
          </h3>
          <Button
            variant="contained"
            size="medium"
            onClick={updateRequest}
            disabled={isLoading}
            endIcon={<SendIcon />}
          >
            수정하기
          </Button>
        </div>

        <div className={styles.nickNameContainer}>
          <label className="form-label">닉네임</label>
          <input
            id="inputNickname"
            type="text"
            disabled
            className="form-control"
            placeholder={!postDetail.nickName ? "익명" : postDetail.nickName}
          />
        </div>

        <div>
          <label htmlFor="inputTitle" className="form-label d-flex">
            제목
          </label>
          <input
            id="inputTitle"
            className={styles.inputTitle}
            type="text"
            defaultValue={postDetail.title}
            ref={TitleElement}
            onKeyDown={handleTabDown}
            maxLength="99"
          />
        </div>

        <div>
          <label htmlFor="react-quill" className="form-label d-flex">
            내용
          </label>
          <ReactQuill
            id="react-quill"
            modules={modules}
            formats={formats}
            selection={{ start: 0, end: 0 }}
            theme="snow"
            style={{ height: "600px" }}
            ref={quillElement}
            onKeyDown={handleShiftTabDown}
            onChange={(e) => handleLimit(e)}
          />
        </div>

        <div className={styles.contentLimitcountContainer}>
          {limit && (
            <div className={styles.contentlimitMessage}>
              최대 글자수를 초과했습니다!
            </div>
          )}
          <div className={styles.contentlimitCount}>{size} / 4500 </div>
        </div>

        <div className={styles.undermenu}>
          <button className={styles.grayoutbutton} onClick={handleCancel}>
            <IoIosArrowBack className="align-self-center" />
            <p className="align-self-center mb-0">목록으로 돌아가기</p>
          </button>
          <Button
            variant="contained"
            size="medium"
            onClick={updateRequest}
            disabled={isLoading}
            endIcon={<SendIcon />}
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostUpdate;
