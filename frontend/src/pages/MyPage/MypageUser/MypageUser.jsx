import styles from './MypageUser.module.css'

export default function MypageUser(){
  return(
    <div>
      <div>내 정보 수정</div>

      <div>여기는 회원 가입시 입력한 기존 유저 정보 확인할 수 있도록</div>

      <hr />

      <h3>비밀번호 변경</h3>
      <button>변경하기</button>

      <div className='여기 토글하면 나타나게 만들거예요'>
        <form action="">
          <p>기존 비밀번호</p>
          <input type="text" placeholder='기존에 설정된 비밀번호를 입력해주세요' />

          <p>새로운 비밀번호</p>
          <input type="text" placeholder='새롭게 변경할 비밀번호를 입력해주세요' />
          
          <p>새로운 비밀번호 확인</p>
          <input type="text" placeholder='새롭게 변경할 비밀번호를 한번 더 입력해주세요' />
        
        </form>
      </div>

      <button>회원 탈퇴</button>
    </div>
  );
}