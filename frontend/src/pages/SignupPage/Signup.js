import styles from './Signup.module.css'
import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="Singup">
      <div className={styles.backButtonContainer} onClick={() => { navigate('/') }}>
        <FaArrowLeft />&nbsp;
        <span>뒤로가기</span>
      </div>
      <Outlet />
    </div>
  )
}

export default Signup;