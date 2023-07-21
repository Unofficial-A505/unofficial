import SweaButton from '../SweaBtn/SweaButton';
import styles from './PostView.module.css'

import { useNavigate } from 'react-router-dom';

export default function PostView(){

  const navigate = useNavigate()
  return(
    <div className={styles.boardcontainer}>
      <button onClick={() => navigate('/post')}>거기 시간 있어?</button>
      <hr/>
      PostView
      <hr/>
      PostView
      <hr/>
      PostView
      <hr/>
      PostView
      <hr/>
      PostView
      <hr/>
      PostView
      <hr/>
      PostView
      <hr/>
    </div>
  );
}