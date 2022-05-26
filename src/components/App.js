import { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import PersonalPage from './PersonalPage';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { authorize, getContent} from '../utils/Auth';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedErr, setLoggedErr] = useState(false);
  const [userData, setUserData] = useState('');
  const history = useHistory();

  const closeErrPopup = () => {
    setLoggedErr(false)
  }

  const handleLogin = ({email, password}) => {
    return authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedErr(true);
      })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt')
      getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserData(res.data.email)
        })
    }
  }

  const signOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    history.push('/sign-in')
  }

  useEffect(() => {
    tokenCheck()
    }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [loggedIn])

  return (
    <Switch>
     
      <ProtectedRoute
        exact
        path="/"
        loggedIn={loggedIn}
        signOut={signOut}
        userData={userData}
        component={PersonalPage}
      />
    
      <Route path="/sign-up">
        <Register />
      </Route>
      <Route path="/sign-in">
        <Login handleLogin={handleLogin} loggedErr={loggedErr} onClosePopup={closeErrPopup} />
      </Route>

      <Route >
        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
      </Route>

    </Switch>
  );
}

export default App;
