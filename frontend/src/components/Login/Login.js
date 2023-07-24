import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import logo from './../../assets/images/whale.png'
import { setEmail } from './../../store/signupSlice'
import { setAccessToken } from './../../store/loginSlice'
import axios from 'axios'


export default function Login({ setModalOpen }){

  let user = useSelector((state)=>state.user)

  let authUser = useSelector((state)=>state.authUser)
  useEffect(()=>{
    console.log(authUser)
  }, [authUser])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 로그인 유저 정보
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const onEmailHandler = (event)=>{setUserEmail(event.target.value)}
  const onPasswordHandler = (event)=>{setUserPassword(event.target.value)}

  // 로그인 알고리즘
  const login = async (e)=>{
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

  // 로그인 유저 인증
  const serverURL = 'http://localhost:8080';
  const requestLogin = async (email, password) => {
    try {
      const response = await axios.post(`${serverURL}/api/auth/login`, {
        email: userEmail,
        password: userPassword,
      });
      // console.log(response.headers);
      dispatch(setAccessToken(response.headers.authorization));
      localStorage.setItem('refresh_token', response.headers.refresh_token);
      setModalOpen(false)
    } 
    catch (err) {
      console.log(err)
      if (err.response && err.response.data.success === false){

        
        alert(err.response.data.message)  // '이메일 인증이 이루어 지지 않았습니다.'
        dispatch(setEmail(userEmail))
        navigate('/signup/complete')

      } else {
        alert('이메일 또는 비밀번호를 확인해주세요.')
      }
      console.log(user.email)
    }
  }

  return (
    <>
      <div className={styles.overlay} onClick={()=>setModalOpen(false)}></div>

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