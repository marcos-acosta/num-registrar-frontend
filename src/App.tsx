import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/LoginPage/LoginPage';
import styles from "./GlobalStyles.module.css";
import { myContext } from './Context'
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateUser from './Components/UpdateUser/UpdateUser';
import AddUser from './Components/AddUser/AddUser';
import PrivacyPage from './Components/PrivacyPage/PrivacyPage';

function App() {
  const userObject = useContext(myContext);
  return (
    <>
      <BrowserRouter>
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/edit/:id" exact component={UpdateUser} />
        <Route path="/add/:number" exact component={AddUser} />
        <div className={styles.bodyDiv}></div>
        <Switch>
          {
            userObject ? null : <Route path="/login" component={LoginPage} />
          }
          <Route path="/" exact component={Homepage} /> 
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
