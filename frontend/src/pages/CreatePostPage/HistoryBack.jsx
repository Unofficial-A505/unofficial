// import React, { useEffect } from 'react';
// import styles from './CreatePostPage.module.css'

// import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';

// export default function HistoryBack({ history }) {
//   const handleGoBack = () => {
//     history.goBack();
//   };

  // useEffect(() => {
  //   console.log(history)

  //   const unblock = history.block(`정말 떠나실건가요?`)
  //   return () => {
  //     unblock();
  //   };
  // }, [history]);

//   return(
//     <div className={styles.undermenu}>
//       <button class={styles.grayoutbutton} onClick={handleGoBack}><IoIosArrowBack />목록으로 돌아가기</button>
//       <button class='btn' id={styles.createsubmitbutton}>게시하기</button>
//     </div>
//   );
// }