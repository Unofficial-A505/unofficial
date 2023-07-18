import styles from './CreatePostPage.module.css'

export default function CreatePostPage(){
  return(
    <div>
      <h1>새 글 작성</h1>
      <input type="text" placeholder="제목" />

      <br />
      <input type="text" placeholder="내용" />
    </div>
  );
}