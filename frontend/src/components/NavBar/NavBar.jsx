/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import main_logo from "./../../assets/images/main_logo.png";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const navigate = useNavigate();

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
        <button className={styles.tab}>건의하기</button>
      </li>
      <li className="nav-item">
        <button className={styles.tab}>칠판</button>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-sm d-flex justify-content-center">
        <div className={`container-fluid ${styles.container}`}>
          <a className="navbar-brand" style={{ padding: "10px" }} href="/">
            <img src={main_logo} alt="main_logo" width={150} />
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
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
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