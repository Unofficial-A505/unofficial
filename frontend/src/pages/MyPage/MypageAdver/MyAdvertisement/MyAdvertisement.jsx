import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './MyAdvertisement.module.css'

export default function MyAdvertisement() {
  const [ads, setAds] = useState([]);
  const accessToken = useSelector(state => state.authUser.accessToken);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users/user', {
      headers: {
        'Authorization': accessToken
      }
    })
    .then(response => {
      const userId = response.data.id;  // 사용자 ID를 가져옵니다.
      console.log(userId);
      // 이제 이 ID를 이용해 해당 사용자의 광고 목록을 가져옵니다.
      return axios.get(`http://localhost:8080/api/ads/list/${userId}`);
    })
    .then(response => {
      setAds(response.data);  // 광고 목록을 상태로 설정합니다.
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }, [accessToken]);

  const handleAddadv = () => {
    window.open("http://localhost:3000/user/advertisement/form", "hello", "top=200,left=300,width=1080,height=600")
  }

  return (
    <div className={styles.myAdvContainer}>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTitle}>
          <h2 className={styles.mypostsTitle}>광고 관리</h2>
          <p className={styles.smallTitle}>현재 게시 광고를 확인하고, 새로운 광고를 게시 신청 할 수 있습니다.</p>
        </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleAddadv}>광고 추가하기</button>
        {/* <button>광고 게시종료</button> */}
      </div>
      <div className={styles.temp}>
        {ads.map(ad => (
          // 이 부분에 각 광고를 표시하는 코드를 작성합니다.
          // 예를 들어 광고 제목만 표시하는 경우:
          <p key={ad.id}>{ad.title}</p>
        ))}
      </div>
    </div>
  </div>
  );
}
