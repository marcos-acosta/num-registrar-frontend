import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom';
import { myContext } from '../../Context'
import { IUser } from '../../types/maintypes';
import colors from '../../constants/colors';
import axios from 'axios';
import styles from './Homepage.module.css';
import Navbar from '../Navbar/Navbar';

const User = (props: any) => { 
  const context = useContext(myContext) as IUser;
  let updateLink = '/edit/' + props.user._id
  return (
    <div className={`${styles[colors[props.user.color]]} ${styles.numberCard}`}>
       {
         context && (props.user.facebookId === context.facebookId) ? (
          <Link to={updateLink} className={`${styles.whiteLink} float-right`}>UPDATE</Link>
         ) : null
       }
      
      <h1><b>{props.user.number}</b></h1>
      <h5><u>{props.user.username}</u></h5>
      {props.user.message}
    </div>
  )
};

const NoUser = (props: any) => {
  const context = useContext(myContext) as IUser;
  let addLink = '/add/' + props.number;
  return (
    <div className={`${styles.numberCard} ${styles.untaken}`}>
      <h2>{props.number}</h2>
      <span className={styles.softText}>
        {
          props.isLoading ? <div>Loading...</div> : (
            context ? 
              (context.number === -1 ? 
                <Link to={addLink} className={styles.whiteLink}>Claim this number!</Link> : 
                <span>Unclaimed</span>) 
              : <span>Log in to claim this number!</span>
          )
        }
      </span>
    </div>
  )
};

export default class UserList extends Component<{}, {users: any, loading: boolean}> {

  constructor(props: any) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      users: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get('https://num-reg.herokuapp.com/api/users/')
      .then(response => {
        this.setState({users: response.data});
        this.setState({loading: false});
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteUser(id: any) {
    axios.delete('https://num-reg.herokuapp.com/api/users/' + id)
      .then(res => console.log(res.data));
    this.setState({
      users: this.state.users.filter((el: any) => el._id !== id)
    })
  }

  fullNumberList() {
    let users = this.state.users;
    let res = [];
    for (let i = 0; i < 100; i++) {
      var numberOwners = users.filter((user: any) => {
        return user.number === i;
      });
      if (numberOwners === undefined || numberOwners.length === 0) {
        res.push(<NoUser number={i} key={i} isLoading={this.state.loading}/>)
      } else {
        let numberOwner = numberOwners[0];
        res.push(<User user={numberOwner} deleteUser={this.deleteUser} key={i}/>)
      }
    }
    return res
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className={styles.centerText}>
          <h1> <b>Natural Number Registrar</b> </h1>
        </div>
        <br/>
        <div className={styles.centerText}>
          { this.fullNumberList() }
        </div>
      </div>
    )
  }
}