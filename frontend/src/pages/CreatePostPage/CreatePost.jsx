import styles from "./CreatePostPage.module.css";
import axios from "axios";

import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

import TopSpace from "../../components/TopSpace/TopSpace";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styled from "styled-components";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import customAxios from "../../util/customAxios";

export default function CreatePost() {
  const navigate = useNavigate();
  const { boardTitle } = useParams();
  const imageURL =
    "https://plus.unsplash.com/premium_photo-1682855669043-fd359f155d3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=505&q=80";

  // styled components
  const Title = styled.h3`
    margin: 0 0 0 10px;
    text-align: start;
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700px;
    line-height: normal;
    display: flex;
  `;
  const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-button: 0.5rem;
    border: none;
    margin-bottom: 2rem;
    width: 100%;
  `;

  // quill 라이브러리 활용해서 에디터 띄우기
  const titleInstance = useRef(null);
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    console.log("mounted");
    quillInstance.current = new Quill(quillElement.current, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          ["link", "image"],
        ],
      },
      ImageResize: { modules: ["Resize"] },
      placeholder: "내용을 작성하세요",
      theme: "snow", // or 'bubble'
    });

    return () => {
      console.log("unmount");
    };
  }, []);

  // post CRUD
  const createPost = () => {
    const title = titleInstance.current.value;
    const content = quillInstance.current.root.innerHTML;
    console.log(title, content, boardTitle);

    customAxios({
      method: "post",
      url: `/api/articles/`,
      data: {
        title,
        content,
      },
      headers: {
        Authorization: `Token ${this.$store.state.token}`,
      }
    })
      .then((res) => {
        navigate(`/boards/${boardTitle}/${res.data.id}`, { replace: true });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      `
      <TopSpace />
      <div className={styles.craetecontainer}>
        <div className={styles.upmenu}>
          <Title>
            <p>`{boardTitle}`</p>
            <p>새 글 작성</p>
          </Title>
          <button className="btn" id={styles.createsubmitbutton}>
            게시하기
          </button>
        </div>

        <div>
          <TitleInput placeholder="제목을 입력하세요" ref={titleInstance} />
        </div>

        <div
          className={styles.editorcontainer}
          id="editor-container"
          ref={quillElement}
        ></div>
        <input type="hidden" id="quill_html" name="content" />

        <button
          onClick={() => console.log(quillInstance.current.root.innerHTML)}
        >
          html까지 뽑고싶어
        </button>
        <button onClick={() => console.log(titleInstance.current.value)}>
          제목 input value
        </button>
        <button
          onClick={() => {
            console.log(quillInstance.current);
            quillInstance.current.insertEmbed(
              quillInstance.current.root,
              "image",
              `${imageURL}`
            );
          }}
        >
          이미지 태그로 삽입하기 테스트
        </button>
      </div>
      <div className={styles.undermenu}>
        <button className={styles.grayoutbutton} onClick={() => navigate(-1)}>
          <IoIosArrowBack />
          목록으로 돌아가기
        </button>
        <button
          className="btn"
          id={styles.createsubmitbutton}
          onClick={createPost}
        >
          게시하기
        </button>
      </div>
    </div>
  );
}
