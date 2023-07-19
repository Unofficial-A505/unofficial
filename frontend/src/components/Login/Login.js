import { useState } from 'react'
import styles from './Login.module.css'
import logo from './../../assets/images/whale.png'
import requestLogin from './LoginFunc.js'

export default function Login({ setModalOpen }){
  // 모달 끄기 
  const closeModal = ()=>{
    setModalOpen(false);
  };
  // 로그인 정보
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onEmailHandler = (event)=>{
    setEmail(event.target.value)
  }
  const onPasswordHandler = (event)=>{
    setPassword(event.target.value)
  }
  const login = (e)=>{
    if (!email || !password) {
      alert('이메일 또는 비밀번호를 입력하세요.')
      return
    } 
    e.preventDefault()
    requestLogin(email, password)
  }
  
  return (
    <>
      <div className={styles.overlay} onClick={closeModal}></div>

      <div className={styles.container}>
        <div className='d-flex justify-content-between mb-3'>
          <img src={logo} width='80' height='80' alt="whale" />
          <div className='d-flex flex-column-reverse'>
            <p className='mb-0'>지금 <b className='fs-6 fw-bold text-dark'>싸브리타임</b>을 시작하세요!</p>
          </div>
        </div>
        <form>
          <div>
            <input type="email" className="form-control mb-1" placeholder="이메일" onChange={onEmailHandler} />
            <input type="password" className="form-control" placeholder="비밀번호" onChange={onPasswordHandler} />
          </div>
          <input className='mt-3' type="submit" value="로그인" onClick={login} />
        </form>
        <div className='mt-3' style={{ margin:'0 auto' }}>
          <span>싸브리타임에 처음이신가요?&nbsp;&nbsp;</span>
          <a href="/signup" className='mb-5 text-decoration-none'>회원가입</a>
        </div>
      </div>
    </>
  )
} 

