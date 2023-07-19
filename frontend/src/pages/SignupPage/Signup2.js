import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

export default function Signup2(){

  let navigate = useNavigate()

  return(
    <div id={styles.container}>
      <h2>싸브리타임 회원가입</h2>
      <p className='my-0'>싸브리타임 계정으로 <b>캠퍼스픽, 싸브리타임</b>등</p>
      <p className='my-0'>다양한 교육생 서비스를 모두 이용하실 수 있습니다.</p>
      <br />
      <h2>등록</h2>
      <p className='mb-3' style={{color:'red'}}>에듀싸피 계정과 동일한 이메일로 가입해주세요.</p>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <input type="submit" value="다음" onClick={()=>{navigate('complete')}} />
    </div>
  )
}
