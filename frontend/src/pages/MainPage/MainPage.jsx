import styles from './MainPage.module.css';
import UserinfoBox from '../../components/UserinfoBox/UserinfoBox';
import ssafyButton from '../../components/ssafyButton/ssafyButton';
import eduGrantsButton from '../../components/eduGrantsButton/eduGrantsButton';
import sweaButton from '../../components/sweaButton/sweaButton';
import AdHorizontal from '../../components/AdHorizontal/AdHorizontal';
import weatherinfoApi from '../../components/weatherinfoApi/weatherinfoApi';

export default function MainPage(){
  return (
    <section>
      <div>
        carousel
      </div>
      <div>
        <UserinfoBox />
        <div>
          <eduGrantsButton />
          <ssafyButton />
          <sweaButton />
        </div>
      </div>
      <AdHorizontal />
      <div>
        <div>여기 Best 게시글</div>
      </div>
      <weatherinfoApi />

      <div>
      </div>
    </section>
  )
}