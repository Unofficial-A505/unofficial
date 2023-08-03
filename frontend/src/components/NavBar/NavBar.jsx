/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import main_logo from "./../../assets/images/main_logo.png";
import styles from "./NavBar.module.css";
import Swal from 'sweetalert2';

export default function NavBar() {
  const navigate = useNavigate();
  const handleClick = () => {
    Swal.fire({
      title: '공사중',
      text: '죄송합니다. 아직 업데이트 중입니다.',
      imageUrl: 'https://505bucket.s3.ap-northeast-2.amazonaws.com/static/Starnge505_alert2.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
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

  const MenuItems = () => (
    <ul className="navbar-nav">
      <li className="nav-item">
        <button
          className={styles.tab}
          onClick={() => {
            navigate("/boards/자유게시판");
          }}
        >
          게시판
        </button>
      </li>
      <li className="nav-item">
        <button className={styles.tab} onClick={handleClick}>건의하기</button>
      </li>
      <li className="nav-item">
        <button className={styles.tab} onClick={DEBUGRTC}>디버깅</button>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-sm">
        <div className={`container-fluid ${styles.container}`}>
          <a className="navbar-brand" style={{ padding: "10px" }} href="/">
            <img src={main_logo} alt="main_logo" width={150} style={{marginBottom:'5px'}} />
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
    </div>
  );
}
