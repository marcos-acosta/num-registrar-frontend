import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PrivacyPage.module.css';

export default function PrivacyPage() {

  return (
    <>
      <div className={`${styles.bigText} mt-5`}>
        <Link to={"/"}>Number Registrar</Link>'s Privacy Policy
      </div>
      <div className={`${styles.detailText} mt-2`}>
        The only information stored in Number Registrar's database when logging in with Facebook is your <b>Facebook ID</b> and <b>your name</b> as a temporary placeholder.
        <br/>
        To delete your Facebook ID from the database entirely, simply <b>UPDATE</b> your claimed number and click the <b>DELETE</b> button.
      </div>
    </>
  )
}