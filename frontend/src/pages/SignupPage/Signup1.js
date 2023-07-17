import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';

export default function Signup1(){

  let navigate = useNavigate()

  return(
    <div id={styles.container}>
      <h2>싸브리타임 회원가입</h2>
      <p className='my-0'>싸브리타임 계정으로 <b>캠퍼스픽, 싸브리타임</b>등</p>
      <p className='my-0'>다양한 교육생 서비스를 모두 이용하실 수 있습니다.</p>
      <br />
      <h2>선택</h2>
      <p className='mb-3' style={{color:'red'}}>선택한 지역과 기수는 추후 수정이 불가합니다.</p>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">지역</label>
        <div />
        <select name="enter_region">
          <option disabled selected>지역을 선택하세요</option>
          <option value="서울 캠퍼스">서울 캠퍼스</option>
          <option value="대전 캠퍼스">대전 캠퍼스</option>
          <option value="구미 캠퍼스">구미 캠퍼스</option>
          <option value="광주 캠퍼스">광주 캠퍼스</option>
          <option value="부울경 캠퍼스">부울경 캠퍼스</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">기수</label>
        <div />
        <select name="enter_generation">
          <option disabled selected>기수를 선택하세요</option>
          <option value="8기">8기</option>
          <option value="9기">9기</option>
          <option value="10기">10기</option>
        </select>
      </div>
      <input type="submit" value="다음" onClick={()=>{navigate('/register')}} />
    </div>
  )
}