import styles from './CreatePostPage.module.css'
// import HistoryBack from './HistoryBack'

import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

export default function CreatePostPage(){
  const Title = styled.h3`
  margin: 0 0 0 10px;
  text-align: start;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700px;
  line-height: normal;
  `
  const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-button: 0.5rem;
  border: none;
  margin-bottom: 2rem;
  width: 100%;
  `

  useEffect(() => {
    console.log('mounted')
    var quill = new Quill('#editor-container', {
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

  useEffect(() => {
    var quillBubble = new Quill('#editor-container', {
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          [ 'bold', 'italic', 'underline', 'strike' ],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image']
        ]
      },
      placeholder: '내용을 작성하세요',
      theme: 'bubble'
    });
    return () => {
      console.log('unmount')
    }
  }, []);

  return(
    <div>
      <TopSpace />

      <div className={styles.craetecontainer}>
      <div className={styles.upmenu}>
        <Title>새 글 작성</Title>
        <button class='btn' id={styles.createsubmitbutton}>게시하기</button>
      </div>
      
        <div>
          <TitleInput placeholder="제목을 입력하세요" />
        </div>

        <div class={styles.editorcontainer} id="editor-container"></div>

        <div className={styles.undermenu}>
          <button class={styles.grayoutbutton}><IoIosArrowBack />목록으로 돌아가기</button>
          <button class='btn' id={styles.createsubmitbutton}>게시하기</button>
        </div>
      
      <UnderSpace />
      
      </div>


    </div>
  );
}