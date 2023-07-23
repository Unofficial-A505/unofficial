import styles from './CreatePostPage.module.css'
import axios from 'axios';
// import HistoryBack from './HistoryBack'

import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

export default function CreatePostPage(){
  const navigate = useNavigate();
  const { boardTitle } = useParams();

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
  `
  const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-button: 0.5rem;
  border: none;
  margin-bottom: 2rem;
  width: 100%;
  `

  // quill 라이브러리 활용해서 에디터 띄우기
  const titleInstance = useRef(null);
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    console.log('mounted')
    quillInstance.current = new Quill(quillElement.current, {
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          [ 'bold', 'italic', 'underline', 'strike' ],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image']
        ]
      },
      placeholder: '내용을 작성하세요',
      theme: 'snow'  // or 'bubble'
    });
    return () => {
      console.log('unmount')
    }
  }, []);

  // const quill = quillInstance.current;
  // quill.value('text-change', (delta, oldDelta, source) => {
  //   console.log(quill.root.innerHTML)
  // }, [])

  // useEffect(() => {
  //   var quillBubble = new Quill('#editor-container', {
  //     modules: {
  //       toolbar: [
  //         [{ header: '1' }, { header: '2' }],
  //         [ 'bold', 'italic', 'underline', 'strike' ],
  //         [{ list: 'ordered' }, { list: 'bullet' }],
  //         ['blockquote', 'code-block', 'link', 'image']
  //       ]
  //     },
  //     placeholder: '내용을 작성하세요',
  //     theme: 'bubble'
  //   });
  //   return () => {
  //     console.log('unmount')
  //   }
  // }, []);

  // post CRUD

  const createPost = () => {
    const title = titleInstance.current.value
    const content = quillInstance.current.root.innerHTML
    console.log(title, content, boardTitle)

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/v1/articles/`,
      data: {
        title,
        content,
      },
    // headers: {
    //   Authorization: `Token ${this.$store.state.token}`,
    // }
    })
    .then((res) => {
      navigate(`/boards/${boardTitle}/${res.data.id}`, { replace: true });
      console.log(res.data);
    })
    .catch((err) => console.log(err))
  }

  // 이외 함수들
  const handleCancel = () => {
    navigate(-1);
  }

  return(
    <div>
      <TopSpace />

      <div className={styles.craetecontainer}>
      <div className={styles.upmenu}>
        <Title><p>`{boardTitle}`</p><p>새 글 작성</p></Title>
        <button className='btn' id={styles.createsubmitbutton}>게시하기</button>
      </div>
      
        <div>
          <TitleInput placeholder="제목을 입력하세요" ref={titleInstance}/>
        </div>

        <div className={styles.editorcontainer} id="editor-container" ref={quillElement}></div>

        <button onClick={() => console.log(quillInstance.current.root.innerHTML)}>html까지 뽑고싶어</button>
        <button onClick={() => console.log(titleInstance.current.value)}>제목 input value</button>

        <div className={styles.undermenu}>
          <button className={styles.grayoutbutton} onClick={handleCancel}><IoIosArrowBack />목록으로 돌아가기</button>
          <button className='btn' id={styles.createsubmitbutton} onClick={createPost}>게시하기</button>
        </div>
      
      <UnderSpace />
      
      </div>


    </div>
  );
}