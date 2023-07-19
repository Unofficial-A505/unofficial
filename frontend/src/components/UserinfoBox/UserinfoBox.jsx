import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './UserinfoBox.module.css'
import Login from './../../components/Login/Login'

export default function UserinfoBox(){

  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  return(
    <div>
      <p>SSABRY Time에서 자유롭게 소통해보세요</p>
      <button onClick={()=>{setModalOpen(true)}}>로그인</button>
      <button onClick={()=>{navigate('/signup')}}>회원가입</button>
      {modalOpen && <Login setModalOpen={setModalOpen} />}
    </div>
  )
}