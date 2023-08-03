import styles from "./PostUpdate.module.css";
import axios from "axios";

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import Quill from "quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@looop/quill-image-resize-module-react";

import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

import TopSpace from "../../components/TopSpace/TopSpace";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import customAxios from "../../util/customAxios";

Quill.register("modules/ImageResize", ImageResize);

const Title = styled.h3`
    margin: 0 0 0 10px;
    text-align: start;
    color: #000;s
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700px;
    line-height: normal;
    display: flex;
    `;
const PostUpdate = () => {
  const navigate = useNavigate();
  const { boardTitle } = useParams();
  const { postId } = useParams();
  const [value, setValue] = useState("");
  // const [ updatetitle, setupdateTitle ] = useState("");
  const TitleElement = useRef(null);
  const quillElement = useRef(null);

  const { state : { title, content }} = useLocation(); 

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
    quillElement.current.editor
      .getModule("toolbar")
      .addHandler("image", function () {
        selectLocalImage();
      });

      const delta = quillElement.current.editor.clipboard.convert(content)
      quillElement.current.editor.setContents(delta, 'silent')

  }, []);

  const onChangeValue = (e) => {
    setValue(e);
    console.log(e);
  };

  // const changetitleValue = (e) => {
  //   setupdateTitle(e);
  //   console.log("title", e);
  // };

  // 이미지 url 추출 함수
  function selectLocalImage() {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    console.log("input.type " + fileInput.type);

    fileInput.click();

    fileInput.addEventListener("change", function (e) {
      // change 이벤트로 input 값이 바뀌면 실행
      e.preventDefault();
      const formData = new FormData();
      const file = fileInput.files[0];
      formData.append("uploadFile", file);
      console.log("file", file);
      console.log(formData);

      customAxios({
        method: "post",
        url: `/api/ads/uploadForArticle`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        // headers: {
        //   Authorization: `Token ${this.$store.state.token}`,
        // }
      })
        .then((res) => {
          console.log(res.data);
          console.log("success");
          console.log(typeof res.data);
          // const range = this.quill.getSelection(); // 사용자가 선택한 에디터 범위
          // // uploadPath에 역슬래시(\) 때문에 경로가 제대로 인식되지 않는 것을 슬래시(/)로 변환
          // res.data = res.data.replace(/\\/g, '/');
          const uploadPath = res.data;
          // quillInstance.current.insertEmbed(range.index, 'image', "/board/display?fileName=" + res.uploadPath +"/"+ res.uuid +"_"+ res.fileName);
          quillElement.current.editor.insertEmbed(
            quillElement.current.editor.root,
            "image",
            `${uploadPath}`
          );
        })
        .catch((err) => console.log(err));
    });
  }

  const updatePost = () => {
    const title = TitleElement.current.value;
    const content = quillElement.current.editor.root.innerHTML;
    const boardName = boardTitle;
    const id = postId;
    console.log(title, content, boardTitle);

    customAxios({
      method: "put",
      url: `/api/articles/${postId}`,
      // url: `http://70.12.247.35:8080/files/articleTest`,
      data: {
        id,
        boardName,
        title,
        content,
      },
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
    })
      .then((res) => {
        navigate(`/boards/${boardTitle}/${postId}`, { replace: true });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 이외 함수들
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <TopSpace />
      <NavBar />
      <div className={styles.craetecontainer}>
        <div className={styles.upmenu}>
          <Title>
            <p className={styles.boardTitle}>{boardTitle}</p>
            <p>글 수정</p>
          </Title>
          <button onClick={updatePost} className="btn" id={styles.createsubmitbutton}>
            등록하기
          </button>
        </div>

        <div>
          <input
            className={styles.inputTitle}
            type="text"
            defaultValue={title}
            ref={TitleElement}
          />
          {/* <TitleInput placeholder="제목을 입력하세요" ref={TitleElement}/> */}
        </div>

        <ReactQuill
          id="react-quill"
          value={value}
          onChange={onChangeValue}
          modules={modules}
          formats={formats}
          selection={{ start: 0, end: 0 }}
          theme="snow"
          style={{ height: "100%" }}
          ref={quillElement}
          // dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className={styles.undermenu}>
          <button className={styles.grayoutbutton} onClick={handleCancel}>
            <IoIosArrowBack />
            목록으로 돌아가기
          </button>
          <button
            className="btn"
            id={styles.createsubmitbutton}
            onClick={updatePost}
          >
            등록하기
          </button>
        </div>
      </div>
      <div className={styles.footerContainer}><Footer /></div>
    </div>
  );
};

export default PostUpdate;
