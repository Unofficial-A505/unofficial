import styles from './MyChangePassword.module.css'

export default function MyChangePassword(){
  return(
    <div className={styles.contentContainer}>
        <div class="mb-3 row">
          <label for="staticEmail" class="col-sm-3 col-form-label">이메일</label>
          <div class="col-sm-9">
            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-3 col-form-label">기존 비밀번호</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" id="inputPassword" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-3 col-form-label">새 비밀번호</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" id="inputPassword" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-3 col-form-label">새 비밀번호 확인</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" id="inputPassword" />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" class="btn btn-light">돌아가기</button> */}
          {/* <button type="button" class="btn btn-secondary">돌아가기</button> */}
          <button type="button" class='btn btn-danger'>변경하기</button>
        </div>
      </div>
  );
}