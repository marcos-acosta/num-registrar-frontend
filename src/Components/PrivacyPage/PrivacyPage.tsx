import React from 'react';
import { Link } from 'react-router-dom';
import globalStyles from "./../../GlobalStyles.module.css";
import styles from './PrivacyPage.module.css';

export default function PrivacyPage() {

  return (
    <>
      <div className={`${styles.bigText} mt-5`}>
        <Link to={"/"} className={globalStyles.blackLink}><u>Number Registrar</u></Link>'s Privacy and Data Deletion Policy
      </div>
      <div className={`${styles.detailText} mt-2`}>
        The only information stored in Number Registrar's database when logging in with Facebook is your <b>Facebook ID</b> and <b>your name</b> (as a username placeholder).
        <br/>
        To delete your Facebook ID from the database entirely, simply <b>UPDATE</b> your claimed number and click the <b>DELETE</b> button.
        <br/>
        Number Registrar will never share your Facebook information with anyone ever.
      </div>
    </>
  )
}