import styles from "./SweaButton.module.css";

export default function SweaButton() {
  const sweaClick = () => {
    window.open("https://swexpertacademy.com/main/main.do", "_blank");
  };
  const baekjoonClick = () => {
    window.open("https://www.acmicpc.net/", "_blank");
  };
  const programmersClick = () => {
    window.open("https://programmers.co.kr/", "_blank");
  };

  return (
    <div className="d-flex">
      <button className={styles.swaeContainer} onClick={sweaClick}>
        <div className={styles.swaeLogo} />
        <p className={styles.buttonTitle} style={{ color: "#161616" }}>
          SWEA
        </p>
      </button>
      <button className={styles.baekjoonContainer} onClick={baekjoonClick}>
        <div className={styles.baekjoonLogo} />
        <p className={styles.buttonTitle} style={{ color: "#282c34" }}>
          백준
        </p>
      </button>
      <button
        className={styles.programmersContainer}
        onClick={programmersClick}
      >
        <div className={styles.programmersLogo} />
        <p className={styles.buttonTitle} style={{ color: "#202B3D" }}>
          프로그래머스
        </p>
      </button>
    </div>
  );
}
