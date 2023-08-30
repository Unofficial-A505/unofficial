/* eslint-disable react-hooks/exhaustive-deps */
import styles from './Signup.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setEmail, setPassword } from './../../store/signupSlice'
import axios from 'axios'

export default function Signup2() {

  let user = useSelector((state) => state.user)

  useEffect(() => {
    if (!user.gen || !user.local) {
      navigate('/signup')
    }
  }, [])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userEmail, setUserEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(true)
  const [emailErrorMent, setEmailErrorMent] = useState('')
  const [userPassword1, setUserPassword1] = useState('')
  const [userPassword2, setUserPassword2] = useState('')
  const [passwordMismatch, setPasswordMismatch] = useState(true)

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value)
  }

  const handleEmailValid = (event) => {

    const pattern = /^([0-9a-zA-Z_.-]+)@[0-9a-zA-Z_-]+\.[a-zA-Z_.-]{2,6}$/

    if (event.target.value && !event.target.value.match(pattern)) {
      setEmailValid(false)
      setEmailErrorMent(
        <p style={{ color: 'red', margin: "0" }}>올바른 이메일 주소를 입력해주세요.</p>
      )
      return
    }

    setEmailValid(true)
    setEmailErrorMent('')
  }

  const handlePasswordChange1 = (event) => {
    setUserPassword1(event.target.value);
    setPasswordMismatch(userPassword2 !== event.target.value)
  }

  const handlePasswordChange2 = (event) => {
    setUserPassword2(event.target.value);
    setPasswordMismatch(userPassword1 !== event.target.value)
  }

  // 이메일 입력 오류 확인
  const checkEmail = () => {
    if (!userEmail) {
      alert('이메일을 입력해주세요.')
      return false
    }

    if (!emailValid) {
      alert('올바른 이메일 주소를 입력해주세요.')
      return false
    }
    return true
  }

  // 이메일 중복 확인
  const doubleCheck = () => {

    if (!checkEmail()) {
      return false
    }

    setEmailErrorMent(<p style={{ color: 'green', margin: "0" }}>확인 중입니다.</p>)

    axios
      .post(`${process.env.REACT_APP_SERVER}/api/verify`, { email: userEmail })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setEmailErrorMent(<p style={{ color: 'green', margin: "0" }}>사용 가능한 이메일입니다.</p>)
          setIsDuplicate(false)
        }
      })
      .catch((err) => {
        console.log(err)

        if (err.response && err.response.data.message) {
          setEmailErrorMent(<p style={{ color: 'red', margin: "0" }}>{err.response.data.message}</p>)
        } else {
          setEmailErrorMent(<p style={{ color: 'red', margin: "0" }}>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>)
        }

        setIsDuplicate(true)
        console.log(err)
      })
  }

  // 비밀번호 입력 오류 확인
  const checkPassword = () => {
    let pw = userPassword2
    let num = pw.search(/[0-9]/g);
    let eng = pw.search(/[a-z]/ig);
    // let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?-]/gi);

    if (passwordMismatch) {
      alert('비밀번호가 일치하지 않습니다.')
      return false
    } else if (pw.length < 8 || pw.length > 20) {
      alert("8 ~ 20자리 이내로 입력해주세요.");
      return false
    } else if (pw.search(/\s/) !== -1) {
      alert("비밀번호는 공백 없이 입력해주세요.");
      return false
    } else if (num === -1 || eng === -1) {
      alert("영문,숫자를 혼합하여 입력해주세요.");
      return false
    }
    return true
  }

  // 최종 제출 오류 확인
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isDuplicate) {
      alert('이메일을 확인해 주세요.')
      return
    }
    if (!checkPassword()) {
      alert('비밀번호를 확인해 주세요.')
      return
    }

    // 입력된 이메일과 비밀번호 정보를 user 객체에 저장
    dispatch(setEmail(userEmail))
    dispatch(setPassword(userPassword2))
    navigate('/signup/complete')
  }

  return (
    <form id={styles.container} onSubmit={handleSubmit}>
      <h2>언오피셜 회원가입</h2>
      <p className='my-0'>언오피셜 계정으로 <b>점심식단, 자유게시판</b>등</p>
      <p className='my-0'>다양한 교육생 서비스를 모두 이용하실 수 있습니다.</p>
      <br />
      <h2>등록</h2>
      <p className='mb-3' style={{ color: 'red' }}>에듀싸피 계정과 동일한 이메일 주소로 가입해주세요.</p>

      <div className="mb-2">
        <label htmlFor="exampleInputEmail" className="form-label">이메일</label>
        <div className="input-group">
          <input type="email" className="form-control" id="exampleInputEmail" placeholder="에듀싸피 이메일 (필수)" onChange={handleEmailChange} onInput={handleEmailValid} />
          <button className="btn btn-outline-secondary" type="button" style={{ fontSize: "0.8rem" }} onClick={doubleCheck}>중복확인</button>
        </div>
        {emailErrorMent}
      </div>

      <div className="mb-2">
        <label htmlFor="exampleInputPassword1" className="form-label">비밀번호</label>
        <input type="password" className="form-control" id="exampleInputPassword1" autoComplete="false" placeholder="8자 이상 영문/숫자 사용 (필수)" onChange={handlePasswordChange1} />
      </div>

      <div className="mb-4">
        <label htmlFor="exampleInputPassword2" className="form-label">비밀번호 확인</label>
        <input type="password" className="form-control" id="exampleInputPassword2" autoComplete="false" placeholder="8자 이상 영문/숫자 사용 (필수)" onChange={handlePasswordChange2} />
        {userPassword1 && userPassword2 && passwordMismatch
          && <p style={{ color: 'red', margin: '0' }}>비밀번호가 일치하지 않습니다.</p>}
      </div>

      <input type="submit" value="다음" />
    </form>
  )
}