import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './AddUser.module.css';
import { useInput } from "../../hooks/useInput";
import colors from "../../constants/colors";
import { myContext } from "../../Context";
import { IUser } from "../../types/maintypes";
import Restricted from '../Restricted/Restricted';
import axios from "axios";

export default function AddUser(props: any) {
  const context = useContext(myContext) as IUser;
  const { value:username, setValue:setUsername, bind:bindUsername} = useInput('');
  const { value:message, bind:bindMessage } = useInput('');
  const { value:color, bind:bindColor } = useInput('red');

  useEffect(() => {
    setUsername(context ? context.username : '');
  }, [context, setUsername]);

  const handleSubmit = (evt: any) => {
      evt.preventDefault();

      const user = {
        username: username,
        color: color,
        number: props.match.params.number,
        message: message
      }
      axios.post(`https://num-reg.herokuapp.com/api/users/update/${context._id}`, user)
        .then(res => {
          console.log(res.data);
          window.location.href = '/';
        })
  
      
  }
  return (
    <>
      {(context == null || context.number !== -1) ? <Restricted /> : 
        <div>
          <div className={styles.backButton}>
            <Link to="/" className={styles.black}>
              ⟵ back
            </Link>
          </div>
          <div className={`${styles.centerText} mt-5`}>
            <h1> <b>Claim: {props.match.params.number}</b> </h1>
          </div>
          <br/>
          <form onSubmit={handleSubmit} className={styles.customFormGroup}>
            <div className="form-group">
              <label>Username: </label>
              <input type="text"
                required
                className="form-control"
                {...bindUsername}
                />
            </div>
            <div className="form-group">
              <label>Message: </label>
              <input type="text"
                required
                className="form-control"
                {...bindMessage}
                />
            </div>
            <div className="form-group">
              <label>Color: </label>
              <select 
                className="form-control"
                {...bindColor}>
                {
                  Object.keys(colors).map(item => (
                    <option key={item}>{item}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <input type="submit" value="Claim!" className="btn btn-primary"/>
            </div>
          </form>
        </div>
      }
    </>
  );
}