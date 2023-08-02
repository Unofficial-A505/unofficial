import react, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './UserinfoBox.module.css'
import Login from './../../components/Login/Login'
import main_logo from './../../assets/images/main_logo.png'

import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { RiDatabase2Line } from '@react-icons/all-files/ri/RiDatabase2Line';
import { BsFileEarmarkText } from '@react-icons/all-files/bs/BsFileEarmarkText';
import { AiOutlineComment } from '@react-icons/all-files/ai/AiOutlineComment';

export default function UserinfoBox(){
  const [modalOpen, setModalOpen] = useState(false)

  const [userInfo, setUserInfo] = useState({})
  const user = 'SSAFY 서울 9기'
  const mileage = 5100

  const navigate = useNavigate();
  // user정보 없는 상황
  return(
    <div className={styles.usercontainer}>
      <p className={styles.unloginmessage}>
        언오피셜을 더 편리하게 이용하세요
      </p>
      <button className={styles.loginButton} onClick={()=>{setModalOpen(true)}}>로그인</button>
      {modalOpen && <Login setModalOpen={setModalOpen} />}
      <div className={styles.signupBox}>
        <p onClick={()=>{navigate('/forgot-password')}}>비밀번호 찾기</p>
        <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
        <p onClick={()=>{navigate('/signup')}}>회원가입</p>
      </div>
    </div>
  );

  // // user정보 있는 상황
  // return(
  //   <div className={styles.usercontainer}>
  //     <div className={styles.usertopContainer}>
  //       <p className={styles.hellomessage}>안녕하세요!</p>
  //       <p className={styles.mypage} style={{color:'#034BB9'}} onClick={() => navigate('/user/password')}>마이페이지<IoIosArrowForward /></p>
  //     </div>

  //     <div className={styles.usermidContainer}>
  //       <span class={styles.secondmypage} onClick={() => navigate('/user/password')}>{user}</span><span class={styles.secondhelloMessage}>의 이야기를 들려주세요</span>
  //       <li class={styles.adverMessage}>진행중인 <span class={styles.adverButton} onClick={() => navigate('/user/advertisement/myadv')}>광고</span>가 없습니다.</li>
  //     </div> 
      
  //     <div class={styles.mypageContent}>
  //       <p class={styles.mymileButton} onClick={() => navigate('/user/advertisement/mymile')}><RiDatabase2Line class={styles.mymileIcon} /><p class={styles.mileageTotal}>{mileage}</p></p>
  //       <div class={styles.mypostsAndcomments}>
  //         <p class={styles.myButton} onClick={() => navigate('/user/activity/myposts')}><BsFileEarmarkText class={styles.myIcon} /><p>3</p></p>
  //         <p class={styles.myButton} onClick={() => navigate('/user/activity/mycomments')}><AiOutlineComment class={styles.myIcon}/><p>12</p></p>
  //       </div>
  //     </div>
  //   </div>
  // )
  } 
