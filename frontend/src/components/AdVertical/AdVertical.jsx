import styles from './AdVertical.module.css'
import { useEffect, useState } from "react";
export default function AdVertical(){

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return(
    <>
      <div className={styles.advertiseVer}>
        <ins class="adsbygoogle"
        style={{display:'block'}}
        data-ad-client="ca-pub-2110899329559840"
        data-ad-slot="4214547025"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      </div>
    </>
  );
}