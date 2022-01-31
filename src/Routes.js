import React from 'react';
import { Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Post from './components/Post';
import About from './components/About'
import Dorm from './components/Dorm'

import Home_admin from './components/Admin/Home_admin';
import Register_admin from './components/Admin/Register_admin';
import Login_admin from './components/Admin/Login_admin';


const Routes = () => (
  // <Router {...props}>
  //   <Route path="/" exact component={Home} />
  //   <Route path="/register" exact component={Reg} />    
  //   <Route path="/login" exact component={Login} />
  // </Router>
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/register" exact component={Register} />    
    <Route path="/login" exact component={Login} />
    <Route path="/profile" exact component={Profile}/>
    <Route path="/post" exact component={Post}/>
    <Route path="/about" exact component={About}/>
    <Route path="/dorm/:id" exact component={Dorm}/>


    <Route path="/admin" exact component={Home_admin} />
    <Route path="/admin/register" exact component={Register_admin} />
    <Route path="/admin/login" exact component={Login_admin} />


    

  </div>
);

export default Routes;