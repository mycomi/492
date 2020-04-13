import React from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

import './style.css';

import './style.css'
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { TiUser } from "react-icons/ti";
import { TiHome } from "react-icons/ti";
import { FaArrowUp } from "react-icons/fa";
  
class Navbar extends React.Component {

   

    logout = e =>{
        e.preventDefault();
        const token = localStorage.getItem('token')
        // localStorage.clear('token')
        console.log(token)
        Axios.post(`/api/users/logout`,{
            token: token
        })
        
        .then(res => {
            
            localStorage.clear('token')     
            alert("logout success")
            window.location.reload(false);      
        
        })
        .catch(e => {
        console.log(e)
        console.log(token)
        
        })
    } 

   
    
   render(){
    const currentUser = localStorage.getItem('name')
    return (
        


<div>
    <nav class="navbar navbar-dark bg-blue"  role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
            {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> */}
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item">
            <Link to="/">
                            <button className="button is-link"><TiHome/>Home</button>
            </Link> 
            </a>

            
            <a class="navbar-item">

            <Link to="/about">
                <button className="button is-warning"><TiUser/>  About</button>
            </Link> 
            </a>




            <a class="navbar-item">

            <Link to="/post">
                <button className="button is-danger is-light"><FaArrowUp/> Post</button>
            </Link> 
            </a>
            
            </div>
    </div>
    <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                    <h3 className="navbar-item">
                        <Link to="/profile">
                        <TiUser/>   {currentUser }
                        </Link>
                        
                        <button className="button is-light" onClick={this.logout} >
                        <IoIosLogOut/>Logout
                        </button>
                    </h3>
                    
                </div>
            </div>
    </div>


    

</nav>



                </div>
                 
  
    )
   }
}
 
export default Navbar