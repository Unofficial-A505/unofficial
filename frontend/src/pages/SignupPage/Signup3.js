import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Signup.module.css'
import emailImg from './../../assets/images/emailImg.png'
export default function Signup3(){

  let user = useSelector((state)=>state.user)
  let navigate = useNavigate()

  useEffect(()=> {
    console.log(user)
    if (!user.gen || !user.local || !user.email || !user.password){
      navigate('/signup')
    }
    // console.log(user)
  }, [])

  // 


  return(
    <div className={styles.complete}>
      <img src={emailImg} alt="" width={180} height={180} className='mb-3' />
      <h2>환영합니다! <span>이메일 주소</span>를 인증해 주세요.</h2>
      <div className='mb-3' />
      <p>이메일 인증을 위한 메일이 발송 되었습니다.</p>
      <p>회원가입 완료를 위한 이메일 인증을 진행 해 주세요.</p>
      <div className='mb-3' />
      <p>가입 이메일 주소: {user.emial}</p>
      <div className='mb-3' />
      <p>이메일 주소를 잘못 입력하신 경우</p>
      <p>'고객문의'로 이메일 주소 수정을 요청해 주시기 바랍니다.</p>
      <div className='mb-3' />
      <p className='mb-0'>'이메일을 받지 못하셨나요?.</p>
      <button>이메일 다시 보내기</button>
      <div className='mb-3' />
      <a href='/'>메인페이지로 이동하기</a>
    </div>
  )
}