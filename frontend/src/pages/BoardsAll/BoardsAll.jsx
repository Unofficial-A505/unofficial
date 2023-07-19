import styles from './BoardsAll.module.css'
import AdHorizontal from '../../components/AdHorizontal/AdHorizontal'

export default function BoardsAll(){
  const curr = '지금 게시판에서 검색하기'

  return(
    <div>
      <input type="text" placeholder="찾고싶은 게시글의 제목 또는 내용의 키워드를 검색" />
      <AdHorizontal />
      <input type="text" placholder={curr} />
      
      <nav aria-label="...">
        <ul class="pagination pagination-sm">
          <li class="page-item active" aria-current="page">
            <span class="page-link">1</span>
          </li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
        </ul>
      </nav>

    </div>
  );
}                   