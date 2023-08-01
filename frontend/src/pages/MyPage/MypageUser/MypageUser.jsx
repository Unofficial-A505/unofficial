import styles from './MypageUser.module.css'

import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function MypageUser(){
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location', location.pathname)

  return(
    <div>
      <div className={styles.titleContainer}>
        <p className={ location.pathname == '/user/password' ? styles.titleChecked : styles.title} onClick={() => navigate('/user/password')}>비밀번호 변경</p>
        <p className={ location.pathname == '/user/signout' ? styles.titleChecked : styles.title } onClick={() => navigate('/user/signout')}>회원 탈퇴</p>
      </div>

      <Outlet />
      {/* <div className={styles.contentContainer}>
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
          {/* <button type="button" class='btn btn-danger'>변경하기</button>
        </div>
      </div> */}
    </div>
  );
}