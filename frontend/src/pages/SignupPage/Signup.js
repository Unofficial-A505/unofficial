import styles from './Signup.module.css'
import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft'
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../useDocumentTitle';

function Signup() {
  useDocumentTitle("회원가입");
  
  const navigate = useNavigate();

  return (
    <div className="Singup">
      <div className={styles.backButtonContainer} onClick={() => { navigate('/') }}>
        <FaArrowLeft />&nbsp;
        <p>뒤로가기</p>
      </div>
      <Outlet />
    </div>
  )
}

export default Signup;