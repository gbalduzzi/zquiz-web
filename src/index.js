// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// Pages
import App from './App';
import Home from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Logout from './Pages/Logout';
import User from './Pages/User';
import SearchMatch from './Pages/SearchMatch';

// Css
import './index.css';



// Imposto le pagine della mia APP
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="" component={App}>
            <Route path="/" component={Home}> </Route>
            <Route path="/login" component={Login}> </Route>
            <Route path="/register" component={Register}> </Route>
            <Route path="/user" component={User}> </Route>
            <Route path="/searchMatch" component={SearchMatch}> </Route>
            <Route path="/logout" component={Logout}> </Route>
        </Route>
    </Router>),
  document.getElementById('root')
);
