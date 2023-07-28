import styles from './AddAdvPage.modules.css'
import { useState } from 'react';

export default function AddAdvPage(){
  const [ selectedType, setSelectedType ] = useState('');

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  }

  return (
    <div className={styles.AdvformContainer}>
      <div className={styles.AdvformBox}>
        <h1>광고 신청</h1>

        <div>
          <div>광고 유형</div>
          <select name="enter_local" onChange={handleTypeChange}>
            <option disabled selected>광고 유형을 선택하세요</option>
            <option value="가로">가로 광고</option>
            <option value="세로">세로 광고</option>
        </select>
        </div>

        <div>
          <div>광고 파일 선택</div>
          <input type="file" />
        </div>

        <div>
          <div>연결할 주소</div>
          <input type="text" placeholder="연결할 주소를 입력해주세요"/>
        </div>

        <div>
          <div>광고진행 기간</div>
          <input type="text" placeholder="여기 date selector 넣기" />
        </div>

        <div>
          <div>광고진행 마일리지</div>
          <div>
            <input type="text" placeholder="광고 유형과 광고진행기간에 따라 광고 진행 마일리지 자동계산" />
          </div>
        </div>

        <div>
          <button>광고 신청</button>
          <button>reset</button>
        </div>
      </div>
    </div>
  );
}