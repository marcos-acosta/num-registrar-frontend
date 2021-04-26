import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import colors from '../../constants/colors';
import styles from './UpdateUser.module.css'
import { myContext } from '../../Context';
import { IUser } from '../../types/maintypes';
import { useInput } from '../../hooks/useInput';
import Restricted from '../Restricted/Restricted';

export default function UpdateUser(props: any) {
  const context = useContext(myContext) as IUser;
  const {value:username, setValue:setUsername, bind:bindUsername} = useInput('');
  const {value:message, setValue:setMessage, bind:bindMessage} = useInput('');
  const {value:color, setValue:setColor, bind:bindColor} = useInput('');
  const {value:number, setValue:setNumber} = useInput('');

  useEffect(() => {
    axios.get('https://num-reg.herokuapp.com/api/users/' + props.match.params.id)
      .then(response => {
        setUsername(response.data.username);
        setMessage(response.data.message);
        setColor(response.data.color);
        setNumber(Number(response.data.number));
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id, setColor, setMessage, setNumber, setUsername]);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    const user = {
      username: username,
      color: color,
      number: number,
      message: message
    }
    axios.post(`https://num-reg.herokuapp.com/api/users/update/${props.match.params.id}`, user)
      .then(res => {
        console.log(res.data);
        window.location.href = '/';
      })
  }

  const deleteUser = () => {
    axios.delete('https://num-reg.herokuapp.com/api/users/' + props.match.params.id)
      .then(response => {
        axios.get('https://num-reg.herokuapp.com/auth/logout', {
          withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res.data === 'success') {
              window.location.href = "/";
            }
          })
          .catch(logoutErr => {
            console.log(logoutErr);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      {(context == null || context.number === -1 || context._id !== props.match.params.id) ? <Restricted /> : 
        <div>
          <div className={styles.backButton}>
            <Link to="/" className={styles.black}>
              ⟵ back
            </Link>
          </div>
          {/* <img className="garden" alt="Number garden" src={garden}/> */}
          <div className={`${styles.centerText} mt-5`}>
            <h1> <b>Update: {number}</b> </h1>
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
                  Object.keys(colors).map(item => 
                    (
                      <option key={item}>{item}</option>
                    )
                  )
                }
              </select>
            </div>
            <div className="form-group">
              <input type="submit" value="Update" className="btn btn-primary"/>
              <input value="Delete" className="btn btn-danger" onClick={deleteUser}/>
            </div>
          </form>
        </div>
      }
    </>
  );
}