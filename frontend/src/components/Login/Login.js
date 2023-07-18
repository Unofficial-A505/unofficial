import styles from './Login.module.css'
import logo from './../../assets/images/whale.png'

export default function Login({ setModalOpen }){
  // 모달 끄기 
  const closeModal = ()=>{
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeModal}></div>

      <div className={styles.container}>
        <div className='d-flex justify-content-between mb-3'>
          <img src={logo} width='80' height='80' alt="whale" />
          <div className='d-flex flex-column-reverse'>
            <p className='mb-0'>지금 <b className='fs-6 fw-bold text-dark'>싸브리타임</b>을 시작하세요!</p>
          </div>
        </div>
        <form>
          <div>
            <input type="text" className="form-control mb-1" placeholder="이메일" />
            <input type="text" className="form-control" placeholder="비밀번호" />
          </div>
          <input className='mt-3' type="submit" value="로그인" />
        </form>
        <div className='mt-3' style={{ margin:'0 auto' }}>
          <span>싸브리타임에 처음이신가요?&nbsp;&nbsp;</span>
          <a href="/signup" className='mb-5 text-decoration-none'>회원가입</a>
        </div>
      </div>
    </>
  )
} 

