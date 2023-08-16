import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import main_logo from "./../../assets/images/main_logo.png";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_inner}>
        <div>
          <ul className="mb-4">
            <li>© 2023 All Rights Reserved.</li>
            <li>
              <Link to="https://505bucket.s3.ap-northeast-2.amazonaws.com/static/personal.html">
                개인정보처리방침
              </Link>
            </li>
            <li>
              <Link to="https://505bucket.s3.ap-northeast-2.amazonaws.com/static/using.html">
                이용약관
              </Link>
            </li>
          </ul>
          <div className={styles.contactInfo}>
            <p>개발팀: 이상한 개발팀 오영오</p>
            <p>개발자 대표: 정승구</p>
            <p>이메일: jsgoo2001@naver.com</p>
          </div>
        </div>

        <div className={styles.footerImage}>
          <a href="/">
            <img src={main_logo} alt="main_logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
