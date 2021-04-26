import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { myContext } from '../../Context';
import { IUser } from '../../types/maintypes';

export default function Navbar() {

  const userObject = useContext(myContext) as IUser;

  const logout = () => {
    axios.get("https://num-reg.herokuapp.com/auth/logout", {
      withCredentials: true
    }).then((res: AxiosResponse) => {
      if (res.data === 'success') {
        window.location.href = "/";
      }
    });
  };

  return (
    <div className={styles.navBarWrapper}>
      <ul className={styles.navBar}>
        {
          userObject ? 
            (<li onClick={logout} className="mr-5">log out</li>) : 
            (<li><Link to="/login" className="mr-5">log in // sign up</Link></li>)
        }
      </ul>
    </div>
  )
}
