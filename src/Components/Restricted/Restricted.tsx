import React from 'react';
import styles from './Restricted.module.css';

export default function Restricted() {

  return (
    <>
      <div className={`${styles.restrictedBigText} mt-5`}>
        ʕ•ᴥ•ʔ
      </div>
      <div className={`${styles.restrictedDetail} mt-2`}>
        that URL can't be accessed right now
      </div>
    </>
  )
}