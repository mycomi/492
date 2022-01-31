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

    navbar (){
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

                });
            });
        }

    }
   

    logout = e =>{
        e.preventDefault();
        const token = localStorage.getItem('token')
        // localStorage.clear('token')
        console.log(token)
        Axios.post(`/auth/logout`,{
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

    IsAuth = e =>{
        e.preventDefault();
        const token = localStorage.getItem('token')
        // localStorage.clear('token')
        console.log(token)
        Axios.get(`/auth/IsAuth`,{
            headers: {
                "access-token": token
            }
        })
        
        .then(res => {
        
            console.log(res)
            // window.location.reload(false);      
        
        })
        .catch(e => {
        console.log(e)
        console.log(token)
        
        })

    }

   
    
   render(){
    const currentUser = localStorage.getItem('name')

    this.navbar();

    

    return (
        <div>
            <nav className="navbar navbar-dark bg-blue"  role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item" href="https://bulma.io">
                        {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> */}
                    </div>

                    <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item">
                            <Link to="/">
                                <button className="button is-link"><TiHome/>Home</button>
                            </Link> 
                        </div>

                        {/* <div class="navbar-item">

                            <button className="button is-warning" onClick={this.IsAuth}><TiUser/>  IsAuth</button>
                            
                        </div> */}

                        {/* <div class="navbar-item">

                            <Link to="/post">
                                <button className="button is-danger is-light"><FaArrowUp/> Post</button>
                            </Link> 
                        </div> */}
                        
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <div className="navbar-item">
                                    <Link to="/profile">
                                        <button className="button is-warning" >
                                            <TiUser/>   {currentUser }
                                        </button>
                                    </Link>
                                </div>
                                
                                <button className="button is-light" onClick={this.logout} >
                                    <IoIosLogOut/>Logout
                                </button>
                                
                            </div>
                        </div>
                    </div>


                </div>

                

            </nav>

        </div>

    )
   }
}
 
export default Navbar