import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Signup.module.css'

export default function Signup3(){

  let user = useSelector((state)=>state.user)
  let navigate = useNavigate()

  useEffect(()=> {
    console.log(user)
    if (!user.gen || !user.local || !user.email || !user.password){
      navigate('/signup')
    }
    console.log(user)
  }, [])

  return(
    <div id={styles.container} style={{padding: '120px 48px'}}>
        <p className='my-0 text-dark fs-6'>가입이 완료되었습니다.</p>
        <p className='mt-0 text-dark'>등록한 이메일을 확인하여 <b>본인 인증</b>을 완료해주세요.</p>
      <br />
      <a href='/' className='mb-5 text-decoration-none'>메인페이지로 이동하기</a>
    </div>
  )
}