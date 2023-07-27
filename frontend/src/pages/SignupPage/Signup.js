import styles from './Signup.module.css'
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AiOutlineArrowLeft } from '@react-icons/all-files/ai/AiOutlineArrowLeft'

function Signup() {
  return (
    <div className="Singup">
      <div className={styles.backButtonContainer}>
        <AiOutlineArrowLeft size={15} />&nbsp; 
        <a href="/">뒤로가기</a>
      </div>
      <Outlet />
    </div>
  )
}

export default Signup;