import styles from './MyPage.module.css'
import styled from 'styled-components';

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

import { FiSettings } from '@react-icons/all-files/fi/FiSettings';
import { FiHome } from '@react-icons/all-files/fi/FiHome';
import { FiActivity } from '@react-icons/all-files/fi/FiActivity';
import { RiAdvertisementLine } from '@react-icons/all-files/ri/RiAdvertisementLine';
import { BiLogOut } from '@react-icons/all-files/bi/BiLogOut';

import { Outlet, Link } from 'react-router-dom';

export default function MyPage(){

  const NavtopSpace = styled.div`
    width: 100px;
    height: 40px;
    margin: 0 auto;
    `

  const Navhr = styled.hr`
  width: 220px;
  margin: 10px auto;
  `

  return(
    <>
      <TopSpace />
      <div className={styles.mypageContainer}>
        <div className={styles.mypageNavContainer}>
          <nav>
            <div className={styles.navtopContainer}>
              <NavtopSpace>here is space</NavtopSpace> 
              <div className={styles.navtopnameContainer}><FiSettings className={styles.mypagenavIcon}/><div className={styles.navtoptitle}>설정</div></div>
              <div className={styles.navnameContainer}><FiHome className={styles.mypagenavIcon}/><Link to='/user' className={styles.mypagenavtab}>내 정보 수정</Link></div>
              <div className={styles.navnameContainer}><FiActivity className={styles.mypagenavIcon}/><Link to='/user/activity' className={styles.mypagenavtab} size="30">내 활동 모아보기</Link></div>
              <div className={styles.navnameContainer}><RiAdvertisementLine className={styles.mypagenavIcon}/><Link to='/user/advertisement' className={styles.mypagenavtab}>광고 및 마일리지 관리</Link></div>
            </div>
          </nav>

          <div className={styles.navlogoutContainer}>
            <BiLogOut /><button className={styles.logoutButton}>LogOut</button>
          </div>
        </div>

        <div className={styles.mypageContentContainer}>
          <Outlet />
        </div>
      </div>
      <UnderSpace />
    </>
  );
}