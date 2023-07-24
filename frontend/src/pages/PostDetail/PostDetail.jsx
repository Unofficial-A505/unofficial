import styles from './PostDetail.module.css'
import axios from 'axios';

import { useState, useEffect, useDebugValue } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import BoardView from '../../components/BoardView/BoardView'
import CommentView from '../../components/CommentView/CommentView'
import BestpostsWidget from '../../components/BestpostsWidget/BestpostsWidget'
import EduGrantButton from '../../components/EduGrantButton/EduGrantsButton'

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoRocketOutline } from '@react-icons/all-files/io5/IoRocketOutline';
import { FaRegThumbsUp } from '@react-icons/all-files/fa/FaRegThumbsUp';
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
import { HiOutlinePencilAlt } from '@react-icons/all-files/hi/HiOutlinePencilAlt';
import { HiOutlineSpeakerphone } from '@react-icons/all-files/hi/HiOutlineSpeakerphone';

export default function PostDetail(){
  const navigate = useNavigate();
  const { boardTitle } = useParams();
  const { postId } = useParams();
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('')

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/v1/articles/${postId}/`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
      })
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.log(err))
    return () => {  
      console.log('unmounted')
     }}, []);

  // const { isLoading, error, data: hello } = useQuery(
  //   ['hello', postId ], () => 
  //     axios({
  //     method: "get",
  //     url: `http://127.0.0.1:8000/api/v1/articles/${postId}/`,
  //     // headers: {
  //     //   Authorization: `Token ${this.$store.state.token}`,
  //     // }
  //     })
  //     .then((res) => res.data)
  //     .catch((err) => console.log(err))
  //   );


  const username = '9기 서울'
  const timeago = '21분 전'
  const recommended = 37
  const commentsNum = 3
  
  return(
    <>
      <TopSpace/>
      <div className={styles.postdetailallContainer}>
        <span className={styles.postviewContainer}>
          <div className={styles.postTopbar}>
            <span className={styles.boardTitle}>{boardTitle}</span>
            <button className={styles.grayoutbutton} onClick={() => navigate(-1)}><IoIosArrowBack />목록으로 돌아가기</button>
          </div>
          <div className={styles.postContainer}>

            <div>
              <div className={styles.postTitle}>{title}</div>
              <div className={styles.postusername}>{username}</div>
              <div className={styles.posttimeago}><IoRocketOutline class={styles.tabIcon} size='20'/>{timeago}</div>
            </div>

            <hr />
            <div className={styles.postcontentContainer}>
              <div dangerouslySetInnerHTML={{ __html: content}} />
            </div>

            <div className={styles.postBottombar}>
              <div><FaRegThumbsUp class={styles.tabIcon} size='18'/>{recommended}</div>
              <div className={styles.postupdateBottom}>
                <div className={styles.postupdateBottomtab}><HiOutlinePencilAlt size='15'/>update</div>
                <div className={styles.postupdateBottomtab}><IoTrashOutline size='15'/>delete</div>
                <div className={styles.postupdateBottomtab}><HiOutlineSpeakerphone />공지로 설정하기</div>
              </div>
            </div>

            <hr />
          </div>

          <hr />

          <div>댓글 {commentsNum}</div>

          <input type="text" placeholder="여기 게시글 comment" />
          <div>
            <CommentView />
          </div>

          <nav aria-label="...">
            <ul className="pagination pagination-sm">
              <li className="page-item active" aria-current="page">
                <span className="page-link">1</span>
              </li> 
              <li><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
            </ul>
          </nav>

          <div>
            <button>이전 글 보기</button>
            <button>다음 글 보기</button>
          </div>

          <hr />

          <BoardView />
        </span>

        <span className={styles.sideviewContainer}>
          <BestpostsWidget />
          <EduGrantButton />
        </span>
      </div>
    <UnderSpace />
  </>
  );
};