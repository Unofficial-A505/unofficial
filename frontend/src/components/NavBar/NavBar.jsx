/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import main_logo from "./../../assets/images/main_logo.png";
import styles from "./NavBar.module.css";
import Swal from "sweetalert2";
import Suggestion from "../Suggestion/Suggestion";
import { useSelector } from "react-redux";

export default function NavBar() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  // const DEBUGRTC = () => {
  //   Swal.fire({
  //     title: "공사중",
  //     text: "죄송합니다. 아직 업데이트 중입니다.",
  //     imageUrl:
  //       "https://505bucket.s3.ap-northeast-2.amazonaws.com/static/Starnge505_alert2.png",
  //     imageWidth: 400,
  //     imageHeight: 200,
  //     imageAlt: "Custom image",
  //   });
  // };

  const suggestionHandeler = () => {
    if (authUser.accessToken) {
      handleShow();
    } else {
      alert("로그인 후 사용해 주세요.");
    }
  };

  const RtcHandeler = () => {
    if (authUser.accessToken) {
      navigate("/web-rtc");
    } else {
      alert("로그인 후 사용해 주세요.");
    }
  };

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
    </ul>
  );

  return (
    <div>
      <nav
        className="navbar navbar-expand mb-4"
        style={{ borderBottom: "1px solid #dcdcdc" }}
      >
        <div className={`container-fluid ${styles.container}`}>
          <a className="navbar-brand" href="/">
            <img
              src={main_logo}
              alt="main_logo"
              width={155}
              style={{ alignSelf: "center" }}
            />
          </a>
          <div className="collapse navbar-collapse">
            <MenuItems />
          </div>
          {authUser.accessToken ? (
            <lord-icon
              className={styles.myPage}
              src="https://cdn.lordicon.com/bhfjfgqz.json"
              trigger="hover"
              colors="primary:#121331"
              style={{ width: "35px", height: "35px" }}
              onClick={() => {
                navigate("/user/password");
              }}
            ></lord-icon>
          ) : null}
        </div>
      </nav>

      {/* <div
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
      </div> */}
      <Suggestion show={modalShow} handleClose={handleClose} />
    </div>
  );
}
