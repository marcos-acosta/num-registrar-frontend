import React from 'react';
import facebookLogo from '../../assets/facebookLogo.png';
import styles from './LoginPage.module.css';

export default function LoginPage() {

  const facebookLogin = () => {
    window.location.href= "https://num-reg.herokuapp.com/auth/facebook";
  };

  return (
    <div className={styles.loginPage}>
      <h1 className="mb-3"> Log in </h1>
      <div className="styles.loginForm">
        <div className={`${styles.facebookContainer}`} onClick={facebookLogin}>
          <img src={facebookLogo} alt="Facebook logo"/>
          <p> Log in with Facebook </p>
        </div>
      </div>
    </div>
  )
}
