import React from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

import '../style.css';

import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { MdAssignmentInd } from "react-icons/md";
import { TiUser } from "react-icons/ti";
import { TiHome } from "react-icons/ti";
import { FaArrowUp } from "react-icons/fa";
  
class Navbar_admin extends React.Component {

    componentDidMount = () =>{
        this.navbar();
    }

    navbar (){
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        console.log("navbar click")
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
        const token = localStorage.getItem('token-admin')
        // localStorage.clear('token')
        console.log(token)
        Axios.post(`/auth/logout`,{
            token: token
        })
        
        .then(res => {
            
            localStorage.clear('token-admin')  
            localStorage.clear('name')  
            alert("ออกจากระบบสำเร็จ")
            window.location.reload(false);      
        
        })
        .catch(e => {
        console.log(e)
        console.log(token)
        
        })
    } 

    IsAuth = e =>{
        e.preventDefault();
        const token = localStorage.getItem('token-admin')
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
    if (localStorage.getItem('token-admin')){
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
                                <Link to="/admin">
                                    <button className="button is-link"><TiHome/>หน้าหลัก</button>
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
                                        {/* <Link to="/admin/profile"> */}
                                            <button className="button is-warning" >
                                                <TiUser/>   {currentUser }
                                            </button>
                                        {/* </Link> */}
                                    </div>
                                    
                                    <button className="button is-light" onClick={this.logout} >
                                        <IoIosLogOut/>ออกจากระบบ
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
    
    
                    </div>
    
                    
    
                </nav>
    
            </div>
    
        )

    }else{
        return(
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
                                <Link to="/admin">
                                        <button className="button is-link"><TiHome/>หน้าหลัก</button>
                                </Link> 
                            </div>
                
                            {/* <div class="navbar-item">
                        
                                <Link to="/about">
                                    <button className="button is-warning"><TiUser/>  About</button>
                                </Link> 
                            </div> */}
                        
                        </div>
                        <nav>
                            <div className="navbar-end" >
                                <div className="navbar-item">
                                    <Link to ="/admin/register">
                                        <button className="button is-warning" > <MdAssignmentInd/>สมัครสมาชิก</button>
                                    </Link>
                                    

                                </div>
                                    
                                <div  className="navbar-item" >
                                    <Link to ="/admin/login">
                                        <button className="button is-success"><IoIosLogIn/>เข้าสู่ระบบ</button>
                                    </Link>  
                                </div>
                            </div>  
                        </nav>
                    </div>
                </nav>
                
            </div>
  
            )

    }

    
   }
}
 
export default Navbar_admin