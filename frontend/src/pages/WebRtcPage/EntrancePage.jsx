import { useNavigate } from "react-router-dom";
import styles from "./WebRtcPage.module.css";

function EntrancePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.entrance}>
      <form
        style={{ width: "400px", margin: "15rem auto" }}
        onSubmit={() => {
          navigate("connect");
        }}
      >
        <div class="mb-3">
          <label>언오피셜 랜덤채팅에 접속하시겠습니까?</label>
        </div>
        <button type="submit" className="btn btn-primary">
          접속하기
        </button>
      </form>
    </div>
  );
}

export default EntrancePage;
