/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import main_logo from "./../../assets/images/main_logo.png";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className={`container-fluid ${styles.container}`}>
        <a className="navbar-brand" style={{ padding: "10px" }} href="/">
          <img src={main_logo} alt="main_logo" width={150} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
        </div>
      </div>
    </nav>
  );
}
