import styles from './MainPage.module.css'
import UserinfoBox from '../../components/UserinfoBox/UserinfoBox'
import ssafyButton from '../../components/ssafyButton/ssafyButton'
import eduGrantsButton from '../../components/eduGrantsButton/eduGrantsButton'


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
          <button>SW Expert Academy</button>
        </div>
      </div>
    </section>
  )
}