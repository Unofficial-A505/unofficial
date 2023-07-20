import styles from './BoardView.module.css'
import PostView from '../PostView/PostView'

export default function BoardView(){
  return(
    <div>
      여기 게시글 모음
      <PostView />
    </div>
  );
}