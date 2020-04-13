import React from 'react';
import { Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Reg from './components/Reg';
import Profile from './components/Profile';
import Post from './components/Post';
import About from './components/About'


const Routes = () => (
  // <Router {...props}>
  //   <Route path="/" exact component={Home} />
  //   <Route path="/register" exact component={Reg} />    
  //   <Route path="/login" exact component={Login} />
  // </Router>
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/register" exact component={Reg} />    
    <Route path="/login" exact component={Login} />
    <Route path="/profile" exact component={Profile}/>
    <Route path="/post" exact component={Post}/>
    <Route path="/about" exact component={About}/>


    

  </div>
);

export default Routes;