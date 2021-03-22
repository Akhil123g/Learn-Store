import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Dashboard from './components/dashboard/Dashboard';
import store from './store'

import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/Landing';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Mylearnings from './components/mylearnings/Mylearnings';
import Mylearning from './components/mylearnings/Mylearning';
import Notfound from './components/Notfound';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Fragment>
          <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <PrivateRoute exact path="/home" component={Dashboard}></PrivateRoute>
            <PrivateRoute exact path="/mylearning" component={Mylearnings}></PrivateRoute>
            <PrivateRoute exact path="/mylearning/:id" component={Mylearning}></PrivateRoute>
            <Route component={Notfound}/>
          </Switch>
        </Fragment>
      </Fragment>
    </Router>
  </Provider>


}



export default App;
