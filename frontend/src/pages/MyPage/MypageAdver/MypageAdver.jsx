import styles from './MypageAdver.module.css'

import { RiDatabase2Line } from '@react-icons/all-files/ri/RiDatabase2Line';

export default function MypageAdver(){
  const mileage = 5100

  return(
    <div>
      <div>광고 및 마일리지 관리</div>
      <hr />

      <RiDatabase2Line size='30'/><span>내 마일리지</span><span>{mileage}</span>

      <div>
        <div>마일리지 사용 내역</div>
        <div></div>
      </div>

      <hr />

      <div>
        <h3>광고 관리</h3>
        <button>광고 신청하기 (여기 modal 연결하기)</button>

        <div>
          <div>현재 게시중인 광고</div>
        </div>
      </div>
      
    </div>
  );
}