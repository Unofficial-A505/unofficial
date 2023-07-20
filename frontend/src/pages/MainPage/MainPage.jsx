import styles from './MainPage.module.css';
import UserinfoBox from '../../components/UserinfoBox/UserinfoBox';
import AdHorizontal from '../../components/AdHorizontal/AdHorizontal';
import AdVertical from '../../components/AdVertical/AdVertical';
import SsafyButton from '../../components/SsafyButton/SsafyButton';
import SweaButton from '../../components/SweaButton/SweaButton';
import EduGrantsButton from '../../components/EduGrantsButton/EduGrantsButton';
import BoardView from '../../components/BoardView/BoardView';
import WeatherinfoApi from '../../components/WeatherinfoApi/WeatherinfoApi';
import LunchCarousel from '../../components/LunchCarousel/LunchCarousel';

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

export default function MainPage(){
  return (
    <section>
      <TopSpace />
      <div className={styles.topcontainer}>
        <LunchCarousel />
        <div>
          <div className={styles.usermainContainer}>
            <UserinfoBox />
          </div>
          <div className={styles.bannerContainer}>
            <EduGrantsButton />
            <SsafyButton />
            <SweaButton />
          </div>
        </div>
      </div>

      <div className={styles.horiadcontainer}>
        <AdHorizontal />
      </div>

      <div className={styles.middlecontainer}>
        <AdVertical />
        <span className={styles.bestboard}>
          <BoardView />
        </span>
        <WeatherinfoApi />
      </div>

      <UnderSpace />
    </section>
  )
}