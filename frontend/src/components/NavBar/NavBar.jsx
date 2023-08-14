/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import main_logo from "./../../assets/images/main_logo.png";
import styles from "./NavBar.module.css";
import Swal from 'sweetalert2';
import Suggestion from "../Suggestion/Suggestion";
import { useSelector } from "react-redux";

export default function NavBar() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const DEBUGRTC = () => {
    Swal.fire({
      title: '공사중',
      text: '죄송합니다. 아직 업데이트 중입니다.',
      imageUrl: 'https://505bucket.s3.ap-northeast-2.amazonaws.com/static/Starnge505_alert2.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }

  const suggestionHandeler = () => {
    if (authUser.accessToken) {
      handleShow();
    } else {
      alert("로그인 후 사용해 주세요.");
    }
  };

  // const RtcHandeler = () => {
  //   if (authUser.accessToken) {
  //     navigate("/web-rtc");
  //   } else {
  //     alert("로그인 후 사용해 주세요.");
  //   }
  // };

  const MenuItems = () => (
    <ul className="navbar-nav">
      <li className="nav-item">
        <button
          className={styles.tab}
          onClick={() => {
            navigate("/boards/1");
          }}
        >
          게시판
        </button>
      </li>
      <li className="nav-item">
        <button className={styles.tab} onClick={suggestionHandeler}>
          건의하기
        </button>
      </li>
      <li className="nav-item">
        {/* <button className={styles.tab} onClick={RtcHandeler}> */}
        <button className={styles.tab} onClick={DEBUGRTC}>
          디버깅
        </button>
      </li>
    </ul>
  );

  return (
    <div>
      {/* <nav className="navbar navbar-expand-sm"> */}
      <nav className="navbar navbar-expand">
        <div className={`container-fluid ${styles.container}`}>
          <a className="navbar-brand" style={{ padding: "10px" }} href="/">
            <img
              src={main_logo}
              alt="main_logo"
              width={155}
              style={{ marginBottom: "2px" }}
            />
          </a>
          <div className="collapse navbar-collapse">
            <MenuItems />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <MenuItems />
        </div>
      </div>
      <Suggestion show={modalShow} handleClose={handleClose} />
    </div>
  );
}
