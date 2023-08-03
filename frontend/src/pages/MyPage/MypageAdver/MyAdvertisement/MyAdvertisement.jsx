import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './MyAdvertisement.module.css'
import customAxios from '../../../../util/customAxios';
import AddAdvPage from '../AddAdvPage';
import { Link } from 'react-router-dom';
export default function MyAdvertisement() {
  const [ads, setAds] = useState([]);
  //const accessToken = useSelector(state => state.authUser.accessToken);
  const containerStyle = {
    maxHeight: '45vh', // Adjust this value as needed
    overflowY: 'auto'
  };
  //customAxios.get('/api/users/user')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await customAxios.get('/api/users/user');
        const userId = userResponse.data.id;
        //console.log("aaaaaaaaaaaaa",userId);
        const adsResponse = await customAxios.get(`/api/ads/list/${userId}`);
        setAds(adsResponse.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
  
    fetchData();
  }, []);

  
  return (
    <div className={styles.myAdvContainer}>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTitle}>
          <h2 className={styles.mypostsTitle}>광고 관리</h2>
          <p className={styles.smallTitle}>현재 게시 광고를 확인하고, 새로운 광고를 게시 신청 할 수 있습니다.</p>
        </div>
      <div className={styles.buttonContainer}>
        <Link to="/user/advertisement/form">
          <button>광고 추가하기</button>
        </Link>
        {/* <button>광고 게시종료</button> */}
      </div>
      <div className={styles.temp}>
        <div style={containerStyle}>
          {ads.map(ad => (
            // 이 부분에 각 광고를 표시하는 코드를 작성합니다.
            // 예를 들어 광고 제목만 표시하는 경우:
            <div key={ad.adsId}>
            <img src={ad.imagePath} alt="Ad" />
            <p>광고 URL: {ad.redirectUrl} || 광고 날짜: {ad.endDate}까지 &nbsp; &nbsp;
              {
                new Date(ad.endDate) <= new Date() ? <span className={styles.rejected}>만료됨</span> :
                ad.adminConfirmed === 'PENDING' ? <span className={styles.pending}>승인 대기중...</span> :
                ad.adminConfirmed === 'APPROVED' ? <span className={styles.approved}>승인 완료</span> :
                ad.adminConfirmed === 'REJECTED' ? <span className={styles.rejected}>거부됨</span> :
                '상태 알 수 없음'
              }
            </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}
