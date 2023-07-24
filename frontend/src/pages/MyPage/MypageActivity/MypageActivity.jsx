import styles from './MypageActivity.module.css'

export default function MypageActivity(){
  const user = 'SSAFY 서울 9기'
  const date = 100
 
  return(
    <div>
      <div>내 활동 모아보기</div>
      <hr />

      <div>
      <p>안녕하세요!</p>
      <span><p>{user}</p>님!</span>
      </div>
      <div>가입한지 +{date}일</div>

      <hr />

      <div>
        <h3>내 게시글</h3>
        <div></div>
      </div>

      <hr />

      <div>
        <h3>내 댓글</h3>
        <div></div>
      </div>

      <hr />

      <div>
        <h3>즐겨찾기 게시판 관리</h3>
        <div></div>
      </div>

    </div>
  );
}