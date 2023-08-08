import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import yourImage from "./../../assets/images/main_logo.png";
export default function Footer() {
  return (
    <div id={styles.wrap}>
      <div className={styles.footer}>
        <div className={styles.contactInfo}>
          <p>개발팀: 이상한 개발팀 오영오</p>
          <p>개발자 대표: 정승구</p>
          <p>이메일: jsgoo2001@naver.com</p>
          <p>전화번호: 010-1234-5678</p>
        </div>
        <ul>
          <li><Link to="/privacy-policy">개인정보처리방침</Link></li>
          <li><Link to="/terms-of-use">이용약관</Link></li>
          <li><Link to="/youth-protection">청소년보호정책</Link></li>
        </ul>
        <div className={styles.footerImage}>
          <img src={yourImage} alt="Footer Image" />
        </div>
      </div>
    </div>
  );
}
