import styles from "./CreatePostPage.module.css";

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import Quill from "quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@looop/quill-image-resize-module-react";

import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import TopSpace from "../../components/TopSpace/TopSpace";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

import { postImageApi, postCreateApi } from "../../api/posts";
import useDocumentTitle from "../../useDocumentTitle";
import { tab } from "@testing-library/user-event/dist/tab";

Quill.register("modules/ImageResize", ImageResize);

const QuillContainer = () => {
  useDocumentTitle("게시글 작성");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nickNameInput, setnickName] = useState("");
  const [imageList, setimageList] = useState([]);
  const { state: currboardName } = useLocation();
  const { boardId } = useParams();
  const TitleElement = useRef(null);
  const quillElement = useRef(null);

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        // [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ["link", "image"],
      ],
    },
    ImageResize: { modules: ["Resize"] },
  };

  const handleTabDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      window.document.querySelector(".ql-editor").focus();
    }
  };

  const handleShiftTabDown = (event) => {
    if (event.key === "Tab" && event.shiftKey) {
      event.preventDefault();
      window.document
        .querySelector(".CreatePostPage_inputTitle__GMlQG")
        .focus();
    }
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
    quillElement.current.editor
      .getModule("toolbar")
      .addHandler("image", function () {
        selectLocalImage();

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }, [imageList]);

  const changeImageList = (url, file) => {
    setimageList([...imageList, { url, file }]);
  };

  // 이미지 url 추출 함수
  function selectLocalImage() {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");

    fileInput.click();

    fileInput.addEventListener("change", function (e) {
      e.preventDefault();
      // editor에 이미지 삽입
      const fileURL = window.URL.createObjectURL(e.target.files[0]);
      const file = fileInput.files[0];
      const Image = Quill.import("formats/image");
      Image.sanitize = (fileURL) => fileURL;
      quillElement.current.editor.insertEmbed(
        quillElement.current.editor.root,
        "image",
        `${fileURL}`
      );

      // 이미지 로컬 url 및 formData 담을 file ImageList에 담기
      changeImageList(fileURL, file);
    });
  }

  function sendformData() {
    let content = quillElement.current.editor.root.innerHTML;
    return new Promise(function (resolve, reject) {
      // let content = quillElement.current.editor.root.innerHTML;
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

  function sendPost(content) {
    return new Promise(function (resolve, reject) {
      const title = TitleElement.current.value;
      const boardName = currboardName;
      const nickName = nickNameInput;
      // console.log("send Post", title, content, currboardName, nickNameInput);

      postCreateApi(title, content, boardName, nickName)
        .then((res) =>
          navigate(`/boards/${boardId}/${res.data.id}`, { replace: true })
        )
        .catch((err) => console.log(err));
    });
  }

  const createRequest = () => {
    const titleTest = TitleElement.current.value;
    let contentTest = quillElement.current.editor.root.innerHTML;
    // console.log(contentTest)
    if (!titleTest) {
      alert("제목을 입력해주세요!");
    } else if (contentTest == "<p><br></p>") {
      alert("내용을 입력하세요!");
    } else if (!nickNameInput) {
      alert("닉네임을 입력하세요!");
    } else {
      createPost();
    }
  };

  async function createPost() {
    try {
      setIsLoading(true); // 로딩 시작
      const content = await sendformData();
      await sendPost(content);
    } catch (err) {
      console.error("Error in createPost:", err);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }

  // 이외 함수들
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.craetecontainer}>
      <div className={styles.topmenu}>
        <h3 className={styles.topmenuBox}>
          <p className={styles.boardTitle}>{currboardName}</p>
          <p>새 글 작성</p>
        </h3>
        <button
          className="btn"
          id={styles.createsubmitbutton}
          onClick={createRequest}
          disabled={isLoading}
        >
          게시하기
        </button>
      </div>

      <div className={styles.nickNameContainer}>
        <label for="inputNickname" class="form-label">
          닉네임
        </label>
        <input
          id ="inputNickname"
          type="text"
          class="form-control"
          onChange={(e) => setnickName(e.target.value)}
          placeholder="닉네임을 입력하세요"
        />
      </div>

      <div>
        <input
          className={styles.inputTitle}
          type="text"
          placeholder="제목을 입력하세요"
          onKeyDown={handleTabDown}
          ref={TitleElement}
        />
      </div>

      <ReactQuill
        id="react-quill"
        onKeyDown={handleShiftTabDown}
        modules={modules}
        formats={formats}
        selection={{ start: 0, end: 0 }}
        theme="snow"
        style={{ height: "600px" }}
        ref={quillElement}
      />

      <div className={styles.undermenu}>
        <button className={styles.grayoutbutton} onClick={handleCancel}>
          <IoIosArrowBack className="align-self-center" />
          <p className="align-self-center">목록으로 돌아가기</p>
        </button>
        <button
          className="btn"
          id={styles.createsubmitbutton}
          onClick={createRequest}
        >
          게시하기
        </button>
      </div>
    </div>
  );
};

export default QuillContainer;
