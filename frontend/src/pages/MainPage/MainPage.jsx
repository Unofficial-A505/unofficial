import styles from './MainPage.module.css';
import UserinfoBox from '../../components/UserinfoBox/UserinfoBox';
import AdHorizontal from '../../components/AdHorizontal/AdHorizontal';
import AdVertical from '../../components/AdVertical/AdVertical';
import EdussafyButton from '../../components/EdussafyButton/EdussafyButton';
import SweaButton from '../../components/SweaBtn/SweaButton';
import EduGrantsButton from '../../components/EduGrantButton/EduGrantsButton';
import BoardView from '../../components/BoardView/BoardView';
import WeatherinfoApi from '../../components/WeatherAPI/WeatherinfoApi';
import LunchCarousel from '../../components/LunchCarousel/LunchCarousel';

import TopSpace from '../../components/TopSpace/TopSpace';
import UnderSpace from '../../components/UnderSpace/UnderSpace';

import { FaCrown } from '@react-icons/all-files/fa/FaCrown';

export default function MainPage(){
  return (
    <section>
      <TopSpace />
      <div className={styles.topcontainer}>
        <LunchCarousel />
        <div div={styles.toprightContainer}>
          <div className={styles.usermainContainer}>
            <UserinfoBox />
          </div>
          <div className={styles.bannerContainer}>
            <EduGrantsButton />
            <EdussafyButton />
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
          <div className={styles.bestTitle}>Best 게시글<FaCrown className={styles.bestIcons}/></div>
          <BoardView />
        </span>
        <WeatherinfoApi />
      </div>

      <UnderSpace />
    </section>
  )
}