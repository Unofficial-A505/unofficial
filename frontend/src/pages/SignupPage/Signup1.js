import styles from './Signup.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLocal, setGen } from './../../store/signupSlice'


export default function Signup1(){

  let [selectedLocal, setSelectedLocal] = useState('')
  let [selectedGen, setSelectedGen] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLocalChange = (event) => {
    setSelectedLocal(event.target.value);
  }
  const handleGenChange = (event) => {
    setSelectedGen(event.target.value);
  }
  const handleSubmit = () => {
    if (!selectedLocal || !selectedGen) {
      alert('지역과 기수를 선택해주세요.')
    }
    // 선택한 지역과 기수 정보를 user 객체에 저장
    dispatch(setLocal(selectedLocal))
    dispatch(setGen(selectedGen))
    navigate('register')
  }

  return(
    <div id={styles.container}>
      <h2>싸브리타임 회원가입</h2>
      <p className='my-0'>싸브리타임 계정으로 <b>캠퍼스픽, 싸브리타임</b>등</p>
      <p className='my-0'>다양한 교육생 서비스를 모두 이용하실 수 있습니다.</p>
      <br />
      <h2>선택</h2>
      <p className='mt-0 mb-3' style={{color:'red'}}>선택한 지역과 기수는 이후 변경이 불가합니다.</p>
      <div className="mb-2">
        <label className="form-label mb-0">지역</label>
        <div />
        <select name="enter_local" onChange={handleLocalChange}>
          <option disabled selected>지역을 선택하세요</option>
          <option value="서울">서울 캠퍼스</option>
          <option value="대전">대전 캠퍼스</option>
          <option value="구미">구미 캠퍼스</option>
          <option value="광주">광주 캠퍼스</option>
          <option value="부울경">부울경 캠퍼스</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="form-label mb-0">기수</label>
        <div />
        <select name="enter_gen" onChange={handleGenChange}>
          <option disabled selected>기수를 선택하세요</option>
          <option value="1">1기</option>
          <option value="2">2기</option>
          <option value="3">3기</option>
          <option value="4">4기</option>
          <option value="5">5기</option>
          <option value="6">6기</option>
          <option value="7">7기</option>
          <option value="8">8기</option>
          <option value="9">9기</option>
          <option value="10">10기</option>
        </select>
      </div>
      <input type="submit" value="다음" onClick={handleSubmit} />
    </div>
  )
}