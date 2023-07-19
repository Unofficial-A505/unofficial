import styles from './CreatePostPage.module.css'

import React, { useEffect, useRef } from 'react';
import useDidMountEffect from '../../components/DidMountEffect';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

export default function CreatePostPage(){
  const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-button: 0.5rem;
  border: none;S
  margin-bottom: 2rem;
  width: 100%;S
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

  return(
    <div>
      <h1>새 글 작성</h1>
      <TitleInput placeholder="제목을 입력하세요" />
      <div id="editor-container"></div>
    </div>
  );
}