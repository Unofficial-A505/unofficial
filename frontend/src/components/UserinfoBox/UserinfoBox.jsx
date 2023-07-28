import react, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './UserinfoBox.module.css'
import Login from './../../components/Login/Login'

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
  // return(
  //   <div className={styles.usercontainer}>
  //     <div className={styles.logincenterbox}>
  //       <p className={styles.unloginmessage}>언오피셜에서 자유롭게 소통해보세요</p>
  //       <div className={styles.loginContainer}>
  //         <button className={styles.userButton} onClick={()=>{setModalOpen(true)}}>로그인</button>
  //         <button className={styles.userButton} onClick={()=>{navigate('/signup')}}>회원가입</button>
  //         {modalOpen && <Login setModalOpen={setModalOpen} />}
  //       </div>
  //     </div>
  //   </div>
  // );

  // // user정보 있는 상황
  // return(
  //   <div className={styles.usercontainer}>
  //     <div className={styles.logincenterbox}>
  //       <p className={styles.unloginmessage}>SSABRY Time에서 자유롭게 소통해보세요</p>
  //       <div className={styles.loginContainer}>
  //         <button className={styles.userButton} onClick={()=>{setModalOpen(true)}}>로그인</button>
  //         <button className={styles.userButton} onClick={()=>{navigate('/signup')}}>회원가입</button>
  //         {modalOpen && <Login setModalOpen={setModalOpen} />}
  //       </div>
  //     </div>
  //   </div>
  // );

  // user정보 있는 상황
  return(
    <div className={styles.usercontainer}>
      <div className={styles.usercenterbox}>
        <div className={styles.usertopContainer}>
          <p className={styles.hellomessage}>안녕하세요!</p>
          <button className={styles.mypageButton} onClick={() => navigate('/user')}>마이페이지<IoIosArrowForward size="15"/></button>
        </div>

        <div className={styles.usermidContainer}>
          <button class={styles.secondmypageButton} onClick={() => navigate('/user')}>{user}</button><span class={styles.secondhelloMessage}>의 이야기를 들려주세요</span>
          <li class={styles.adverMessage}>진행중인 <button class={styles.adverButton} onClick={() => navigate('/user/advertisement')}>광고</button>가 없습니다.</li>
        </div> 
        
        <div class={styles.mypageContent}>
          <button class={styles.mymileButton} onClick={() => navigate('/user/advertisement')}><RiDatabase2Line class={styles.mymileIcon} /><p class={styles.mileageTotal}>{mileage}</p></button>
          <div class={styles.mypostsAndcomments}>
            <button class={styles.myButton} onClick={() => navigate('/user/activity')}><BsFileEarmarkText class={styles.myIcon} /><p>3</p></button>
            <button class={styles.myButton} onClick={() => navigate('/user/activity')}><AiOutlineComment class={styles.myIcon}/><p>12</p></button>
          </div>
        </div>
      </div>
    </div>
  )
  } 
