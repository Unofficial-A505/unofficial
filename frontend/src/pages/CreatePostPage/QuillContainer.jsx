import styles from './CreatePostPage.module.css'
import axios from 'axios';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import QuillPresneter from './QuillPresenter';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from '@looop/quill-image-resize-module-react';

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

Quill.register('modules/ImageResize', ImageResize);

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
    `
const QuillContainer = () => {
    const navigate = useNavigate();
    const { boardTitle } = useParams();
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const TitleElement = useRef(null);
    const quillElement = useRef(null); 
    const imageURL = 'https://plus.unsplash.com/premium_photo-1682855669043-fd359f155d3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=505&q=80'
    
    // // styled components
    // const TitleInput = styled.input`
    // font-size: 3rem;
    // outline: none;
    // padding-button: 0.5rem;
    // border: none;
    // margin-bottom: 2rem;
    // width: 100%;
    // `
    
    const modules = {
        toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ header: [1, 2, 3, false] }],
              [{ color: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
              ['link', 'image'],
            ],
          },
        ImageResize: { modules: ['Resize'] },
    };
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'size',
        'color',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'align',
    ];

    useEffect (() => {
      quillElement.current.editor.getModule('toolbar').addHandler('image', function () {
      selectLocalImage();
    })}, [])

    const onChangeValue = (e) => {
        setValue(e);
        console.log(e)
    }

    const changetitleValue = (e) => {
      setTitle(e);
      console.log('title', e)
    }

    // 이미지 url 추출 함수
  function selectLocalImage() {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    console.log("input.type " + fileInput.type);

    fileInput.click();

    fileInput.addEventListener("change", function (e) {  // change 이벤트로 input 값이 바뀌면 실행
      e.preventDefault();
      const formData = new FormData();
      const file = fileInput.files[0];
      formData.append('uploadFile', file);
      console.log('file', file)
      console.log(formData)

      axios({
        method: "post",
        url: `http://unofficial.kr:8080/api/ads/uploadForArticle`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
      })
      .then((res) => {
        console.log(res.data);
        console.log('success')
        console.log(typeof res.data)
        // const range = this.quill.getSelection(); // 사용자가 선택한 에디터 범위
        // // uploadPath에 역슬래시(\) 때문에 경로가 제대로 인식되지 않는 것을 슬래시(/)로 변환
        // res.data = res.data.replace(/\\/g, '/');
        const uploadPath = res.data
        // quillInstance.current.insertEmbed(range.index, 'image', "/board/display?fileName=" + res.uploadPath +"/"+ res.uuid +"_"+ res.fileName);
        quillElement.current.editor.insertEmbed(quillElement.current.editor.root, 'image', `${uploadPath}`);
      })
      .catch((err) => console.log(err))
    })};

    const createPost = () => {
      const title = TitleElement.current.value
      const content = quillElement.current.editor.root.innerHTML
      console.log(title, content, boardTitle)
  
      axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/v1/articles/`,
        // url: `http://70.12.247.35:8080/files/articleTest`,
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
      .catch((err) => {
        console.log(err)
        })
    }

    // 이외 함수들
    const handleCancel = () => {
      navigate(-1);
    }

    return (
      <div>
      <TopSpace />

      <div className={styles.craetecontainer}>
      <div className={styles.upmenu}>
        <Title><p className={styles.boardTitle}>{boardTitle}</p><p>새 글 작성</p></Title>
        <button className='btn' id={styles.createsubmitbutton}>게시하기</button>
      </div>
      
        <div>
          <input className={styles.inputTitle} type="text" placeholder="제목을 입력하세요" ref={TitleElement}/>
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
          style={{height:'100%'}}
          ref={quillElement}
        />

          {/* <button onClick={() => console.log(quillElement.current.editor.root.innerHTML)}>html까지 뽑고싶어</button>
          <button onClick={() => console.log(quillElement.current.editor)}>제목 input value</button>
          <button onClick={() => {
            console.log(quillElement.current)
            // const range = quillElement.current.getSelection();
            quillElement.current.editor.insertEmbed(quillElement.current.editor.root, 'image', `${imageURL}`);
            }}>이미지 태그로 삽입하기 테스트</button>  */}
        <div className={styles.undermenu}>
          <button className={styles.grayoutbutton} onClick={handleCancel}><IoIosArrowBack />목록으로 돌아가기</button>
          <button className='btn' id={styles.createsubmitbutton} onClick={createPost}>게시하기</button>
        </div>
      
      <UnderSpace />
      
      </div>
    </div>
    );
};

export default QuillContainer;