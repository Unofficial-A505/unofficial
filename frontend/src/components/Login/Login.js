import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import logo from './../../assets/images/mobile_logo.png'
import { setEmail } from './../../store/signupSlice'
import { setAccessToken, setAuthUserEmail } from './../../store/loginSlice'
import axios from 'axios'

export default function Login({ setModalOpen }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 로그인 유저 정보
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const onEmailHandler = (event) => { setUserEmail(event.target.value) }
  const onPasswordHandler = (event) => { setUserPassword(event.target.value) }

  // 로그인 알고리즘
  const login = async (e) => {
    e.preventDefault() // 새로고침 방지

    if (!userEmail || !userPassword) {
      alert('이메일 또는 비밀번호를 입력하세요.')
      return
    }

    try {
      await requestLogin(userEmail, userPassword)
    } catch (err) {
      console.log(err)
    }
  }

  const requestLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/auth/login`, {
        email: userEmail,
        password: userPassword,
      });
      // 성공 ? 토큰 저장 && 모달 off
      dispatch(setAuthUserEmail(userEmail));
      dispatch(setAccessToken(response.headers.authorization.split(" ")[1]));
      localStorage.setItem('REFRESH_TOKEN', response.headers.refresh_token);
      window.location.reload() // 로그인 후 새로고침
    }
    catch (err) {
      console.log(err)
      // 실패(이메일 인증 X) ? 이메일 인증화면으로 이동
      if (err.response && err.response.data.success === false) {
        alert(err.response.data.message)  // '이메일 인증이 이루어 지지 않았습니다.'
        dispatch(setEmail(userEmail))
        navigate('/signup/complete')
      } else {
        alert('이메일 또는 비밀번호를 확인해주세요.')
      }
    }
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => setModalOpen(false)}></div>

      <div className={styles.container}>
        <div className='d-flex justify-content-between mb-3'>
          <img src={logo} width='80' height='80' alt="mobile_logo" />
          <div className='d-flex flex-column-reverse'>
            <p className='mb-0'>지금 <b className='fs-6 fw-bold text-dark'>언오피셜</b>을 시작하세요!</p>
          </div>
        </div>
        <form onSubmit={login}>
          <div>
            <input type="email" className="form-control mb-1" placeholder="이메일" onChange={onEmailHandler} />
            <input type="password" className="form-control" placeholder="비밀번호" autoComplete="off" onChange={onPasswordHandler} />
          </div>
          <input type="submit" className="mt-3" value="로그인" />
        </form>
        <div className='mt-3' style={{ margin: '0 auto' }}>
          <span>언오피셜 처음이신가요?&nbsp;&nbsp;</span>
          <a href="/signup" className='mb-5 text-decoration-none'>회원가입</a>
        </div>
      </div>
    </>
  )
}