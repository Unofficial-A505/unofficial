import styles from './MyPage.module.css'

import { Outlet } from 'react-router-dom';

export default function MyPage(){
  return(
    <div>
      MyPage
      <Outlet />
    </div>
  );
}