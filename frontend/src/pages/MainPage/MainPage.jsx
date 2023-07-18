import styles from './MainPage.module.css'
import UserinfoBox from '../../components/UserinfoBox/UserinfoBox'

export default function MainPage(){
  return (
    <section>
      <div>
        carousel
      </div>
      <div>
        <UserinfoBox />
        <div>
          <button>
            <img src="" alt="" />
            <p>교육지원금 서명 생성기</p>
            <img src="" alt="" />
          </button>
          <button>
            <img src="" alt="" />
            <p>삼성 청년 SW 아카데미</p>
          </button> 
          <button>SW Expert Academy</button>
        </div>
      </div>
    </section>
  )
}