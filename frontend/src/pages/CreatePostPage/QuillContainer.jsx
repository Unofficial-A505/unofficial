import styles from "./CreatePostPage.module.css";

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

// 테스트용 axios
import axios from 'axios';

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
const QuillContainer = () => {
    const navigate = useNavigate();
    const { boardTitle } = useParams();
    const [ value, setValue ] = useState('');
    const [ title, setTitle ] = useState('');
    const TitleElement = useRef(null);
    const quillElement = useRef(null); 

    const [ imageList, setimageList ] = useState([])
 
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
              // [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
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
    });
  }, [imageList]);

  const onChangeValue = (e) => {
    setValue(e);
    // console.log(e);
  };

  const changetitleValue = (e) => {
    setTitle(e);
    console.log("title", e);
  };

  const changeImageList = (url, file) => {
    setimageList([...imageList, { url, file }]);
  }

  // 이미지 url 추출 함수
  function selectLocalImage() {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    console.log("input.type " + fileInput.type);

    fileInput.click();

    fileInput.addEventListener("change", function (e) {
      e.preventDefault();
      // editor에 이미지 삽입
      const fileURL = window.URL.createObjectURL(e.target.files[0]);
      const file = fileInput.files[0];
      const Image = Quill.import("formats/image");
      Image.sanitize = (fileURL) => fileURL;
      quillElement.current.editor.insertEmbed(quillElement.current.editor.root, "image", `${fileURL}`);
      
      // 이미지 로컬 url 및 formData 담을 file ImageList에 담기
      changeImageList(fileURL, file);
      console.log('file', file)

      // ql-editor에 이미지 띄움 - 사용 x
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // let src = null
      // reader.onloadend = () => {
      //   src = reader.result
      //   console.log('src', src)
      //   const imageSrc = src.slice(100, 150)
      //   console.log(imageSrc)
      //   quillElement.current.editor.insertEmbed(quillElement.current.editor.root, "image", `${src}`)
      //   // console.log('src', src)
      //   setimageList([...imageList, { imageSrc }])
      //   console.log('setimageList', imageList)
      // }
    })

    // fileInput.addEventListener("change", function (e) {
    //   // change 이벤트로 input 값이 바뀌면 실행
    //   e.preventDefault();
    //   const formData = new FormData();
    //   const file = fileInput.files[0];
    //   formData.append("uploadFile", file);
    //   console.log("file", file);
    //   console.log(formData);

    //   customAxios({
    //     method: "post",
    //     url: `/api/articles/image`,
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //     // headers: {
    //     //   Authorization: `Token ${this.$store.state.token}`,
    //     // }
    //   })
    //     .then((res) => {
    //       console.log(res.data);
    //       console.log("success");
    //       console.log(typeof res.data);
    //       // const range = this.quill.getSelection(); // 사용자가 선택한 에디터 범위
    //       // // uploadPath에 역슬래시(\) 때문에 경로가 제대로 인식되지 않는 것을 슬래시(/)로 변환
    //       // res.data = res.data.replace(/\\/g, '/');
    //       const uploadPath = res.data;
    //       // quillInstance.current.insertEmbed(range.index, 'image', "/board/display?fileName=" + res.uploadPath +"/"+ res.uuid +"_"+ res.fileName);
    //       quillElement.current.editor.insertEmbed(
    //         quillElement.current.editor.root,
    //         "image",
    //         `${uploadPath}`
    //       );
    //     })
    //     .catch((err) => console.log(err));
    // });
  }

  // const createPost = () => {
  //   sendFormData();
  //   sendPost;
  // }

  function sendformData () {
    let content = quillElement.current.editor.root.innerHTML;
    return new Promise(function(resolve, reject) {
      // let content = quillElement.current.editor.root.innerHTML;
  
      console.log(imageList)
      const imagePromises = []
  
      //글 등록하는 현재 content에 존재하는 image만 formData에 싣기
      imageList.forEach((image) => {
        let regexOne = new RegExp(`${image.url}`)
        let imageString = String(regexOne)
        imageString = imageString.replace(/\\/g, '')
    
        const imageChecked = content.match(regexOne)
    
        console.log('imageChecked', imageChecked)
        if (imageChecked) {
          // formData에 해당 이미지 싣기 
          const formData = new FormData();
          formData.append("uploadFile", image.file);
  
          const promise = axios({
            method: "post",
            url: `https://unofficial.kr/api/articles/image`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            // headers: {
              //   Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTEwNjc3MzksInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiOnRydWUsInVzZXJfaWQiOjE0LCJyb2xlIjoiUk9MRV9BRE1JTiJ9.Z_SHpW9_1WQbswqnR4ADZqGNAphQjbEh88uBt2W_BVzKndwCQ4IUkwy7qIp-EuiOhXCWKB2nbR_O71RehedxXw`
              // }
            })
          .then((res) => {
            console.log(res);
            console.log("success");
            
            const uploadPath = res.data;
            content = content.replace(regexOne, `${uploadPath}`)
            console.log('change source', content)
            // quillElement.current.editor.insertEmbed(quillElement.current.editor.root, "image", `${uploadPath}`);
            
            window.URL.revokeObjectURL(image.url)
          })
          .catch((err) => console.log(err));

          imagePromises.push(promise)
        } 
      })
      Promise.all(imagePromises)
      .then(() => {
        resolve(content);
      })
      .catch((err) => {
        reject(err);
      });
    })
  }

  function sendPost(content) {
    return new Promise(function(resolve, reject){
      const title = TitleElement.current.value;
      const boardName = boardTitle;
      const nickName = "다솜";
      console.log(title, content, boardTitle);
  
      customAxios({
        method: "post",
        url: `/api/articles`,
        // url: `http://70.12.247.35:8080/files/articleTest`,
        data: {
          title,
          content,
          boardName,
          nickName,
          // imageList
        },
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTEwNjc3MzksInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiOnRydWUsInVzZXJfaWQiOjE0LCJyb2xlIjoiUk9MRV9BRE1JTiJ9.Z_SHpW9_1WQbswqnR4ADZqGNAphQjbEh88uBt2W_BVzKndwCQ4IUkwy7qIp-EuiOhXCWKB2nbR_O71RehedxXw`
        }
      })
      .then((res) => {
        navigate(`/boards/${boardTitle}/${res.data.id}`, { replace: true });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    })
  };
  async function createPost() {
    try {
      const content = await sendformData();
      console.log("sendformData completed");

      await sendPost(content);
      console.log("sendPost completed");
    }  catch (err) {
      console.error("Error in createPost:", err);
    }
  }

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
            <p>새 글 작성</p>
          </Title>
          <button className="btn" id={styles.createsubmitbutton}>
            게시하기
          </button>
        </div>

        <div>
          <input
            className={styles.inputTitle}
            type="text"
            placeholder="제목을 입력하세요"
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
        />

        {/* <button onClick={() => console.log(quillElement.current.editor.root.innerHTML)}>html까지 뽑고싶어</button>
          <button onClick={() => console.log(quillElement.current.editor)}>제목 input value</button>
          <button onClick={() => {
            console.log(quillElement.current)
            // const range = quillElement.current.getSelection();
            quillElement.current.editor.insertEmbed(quillElement.current.editor.root, 'image', `${imageURL}`);
            }}>이미지 태그로 삽입하기 테스트</button>  */}
        <div className={styles.undermenu}>
          <button className={styles.grayoutbutton} onClick={handleCancel}>
            <IoIosArrowBack />
            목록으로 돌아가기
          </button>
          <button className="btn" id={styles.createsubmitbutton} onClick={createPost}>
            게시하기
          </button>
        </div>
        {/* <button onClick={sendFormData}>image path 여러개 동시 추출 test</button> */}
      </div>
      <div className={styles.footerContainer}><Footer /></div>
    </div>
  );
};

export default QuillContainer;
