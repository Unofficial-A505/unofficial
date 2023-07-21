import styles from './Login.module.css'

export default function Login({ setModalOpen, id, title, content, writer }){
  // 모달 끄기 
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>X</button>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <input type="submit" value="로그인" />
      </form>
    </div>
  )
} 