import styles from './MainPage.module.css';
import UserinfoBox from '../../components/UserinfoBox/UserinfoBox';
import AdHorizontal from '../../components/AdHorizontal/AdHorizontal';
import AdVertical from '../../components/AdVertical/AdVertical';
import SsafyButton from '../../components/SsafyButton/SsafyButton';
import SweaButton from '../../components/SweaButton/SweaButton';
import EduGrantsButton from '../../components/EduGrantsButton/EduGrantsButton';
import WeatherinfoApi from '../../components/WeatherinfoApi/WeatherinfoApi';

export default function MainPage(){
  return (
    <section>
      <div>
        carousel
      </div>
      <div>
        <UserinfoBox />
        <div>
          <SsafyButton />
          <SweaButton />
          <EduGrantsButton />
        </div>
      </div>
      <AdHorizontal />
      <AdVertical />
      <div>
        <div>여기 Best 게시글</div>
      </div>
        <WeatherinfoApi />

      <div>
      </div>
    </section>
  )
}