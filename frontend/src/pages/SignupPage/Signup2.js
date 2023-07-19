import styles from './Signup.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setEmail, setPassword } from './../../store/signupSlice'


export default function Signup2(){

  let user = useSelector((state)=>state.user)
  // 지역, 기수를 입력하지 않은 상태에서 바로 링크타고 들어오는것 방지
  useEffect(()=> {
    if (!user.gen || !user.local){
      navigate('/signup')
    }
  }, [])

  let [userEmail, setUserEmail] = useState('')
  let [emailValid, setEmailValid] = useState(true)
  let [userPassword1, setUserPassword1] = useState('')
  let [userPassword2, setUserPassword2] = useState('')
  let [passwordMismatch, setPasswordMismatch] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleEmailChange=(event)=>{
    setUserEmail(event.target.value)
  }
  const handleEmailValid=(event)=>{
    let pattern = /^([0-9a-zA-Z_\.-]+)@[0-9a-zA-Z_-]+\.[a-zA-Z_-]{2,3}$/
    if (!event.target.value.match(pattern)){
      setEmailValid(false)
      return
    }
    setEmailValid(true)
  }
  const handlePasswordChange1=(event)=>{
    setUserPassword1(event.target.value);
    setPasswordMismatch(userPassword2 !== event.target.value)
  }
  const handlePasswordChange2=(event)=>{
    setUserPassword2(event.target.value);
    setPasswordMismatch(userPassword1 !== event.target.value)
  }
  const checkEmail=()=>{
    if (!userEmail) {
      alert('이메일을 입력해주세요.')
      return false
    }
    // 
    if (!emailValid){
      alert('올바른 이메일 주소를 입력해주세요.')
      return false
    }
    return true
  }
  const checkPassword=()=>{
    let pw = userPassword1
    let num = pw.search(/[0-9]/g);
    let eng = pw.search(/[a-z]/ig);
    let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      alert("8자리 ~ 20자리 이내로 입력해주세요.");
      return false
    }
    if (pw.search(/\s/) !== -1) {
      alert("비밀번호는 공백 없이 입력해주세요.");
      return false
    }
    if (num < 0 || eng < 0 || spe < 0  ){
      alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      return false
    }
    if (passwordMismatch) {
      alert('비밀번호가 일치하지 않습니다.')
      return false
    }
    return true
  }
  const handleSubmit=()=>{

    if (!checkEmail()){
      return
    }
    if (!checkPassword()){
      return
    }
    // 입력된 이메일과 비밀번호 정보를 user 객체에 저장
    dispatch(setEmail(userEmail))
    dispatch(setPassword(userPassword2))
    navigate('/signup/complete')
  }

  return(
    <div id={styles.container}>
      <h2>싸브리타임 회원가입</h2>
      <p className='my-0'>싸브리타임 계정으로 <b>캠퍼스픽, 싸브리타임</b>등</p>
      <p className='my-0'>다양한 교육생 서비스를 모두 이용하실 수 있습니다.</p>
      <br />
      <h2>등록</h2>
      <p className='mb-3' style={{color:'red'}}>에듀싸피 계정과 동일한 이메일 주소로 가입해주세요.</p>
      <div class="mb-1">
        <label for="exampleInputEmail" className="form-label">이메일 주소</label>
        <input type="email" class="form-control" id="exampleInputEmail" onChange={handleEmailChange} onBlur={handleEmailValid} 
        />
        {userEmail && !emailValid 
        && <p style={{color: 'red'}}>올바른 이메일 주소를 입력해주세요.</p> }
      </div>
      <div class="mb-1">
        <label for="exampleInputPassword1" className="form-label">비밀번호</label>
        <input type="password" class="form-control" id="exampleInputPassword1" onChange={handlePasswordChange1} />
      </div>
      <div class="mb-1">
        <label for="exampleInputPassword2" className="form-label">비밀번호 확인</label>
        <input type="password" class="form-control" id="exampleInputPassword2" onChange={handlePasswordChange2} />
        {userPassword1 && userPassword2 && passwordMismatch 
        && <p style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</p>}
      </div>
      <input type="submit" value="다음" onClick={handleSubmit} />
    </div>
  )
}
