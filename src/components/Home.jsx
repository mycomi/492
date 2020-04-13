import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import Axios from 'axios';

import './style.css';


import { FaAndroid } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { TiHome } from "react-icons/ti";
// import firebase from '../firebase/firebase'
import Background from './f14.png';
import { app } from 'firebase';
import imges2 from './f14.png';
import desktopImage from './f14.png';
import mobileImage from './f14.png';
import { TiUser } from "react-icons/ti";
// import firebase from '../firebase/firebase'


// import Navbar from './Navbar'
// import MessageList from './MessageList'

class Home extends React.Component {

    state = {
        title: '',
        body: '',
        posts: []
    };

    componentDidMount = () => {
        this.getPost();
    }

    displayPost = (posts) => {
        // if (!posts.length) return null;

        return posts.map( (post,index) => (
            <div key={index} className="blog-post__display">
                <h3> ชื่อหอ: {post.Aname } </h3>
                <p> ราคา/เดือน: {post.price} </p>
                <p> ที่อยู่: {post.address} </p>
                <p> รายละเอียด: {post.info} </p>
                <p> ติดต่อ: {post.tel} </p>
                <p> --------------------------------------------------------------------------------------------- </p>
            </div>
        ))

    }

    getPost = () =>{
        Axios.get(`http://localhost:3000/api/itemsAll`,{ 
            
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           this.setState({ posts: data});
           console.log('GG');
           console.log(data)

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })
    }

       
    
        
    
        render() {
            // const {message,currentUser} = this.state
            if (localStorage.getItem('token')){
                return(
                    <div>
                    
                           <Navbar />
                           
                           
                           <div >
                    <a href="https://bulma.io">
                      {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> */}
                    </a>
                    <div id="navbarBasicExample" className="navbar-menu">
                 <div className="navbar-start">
                 <div className="navbar-item">
                         <div className="buttons">
                             {/* <h3 className="navbar-item">
                                 <Link to="/post">
                                 <center>
                                      <button className="button is-light"  >
                                  Post
                              </button>
                              </center>
                                 </Link>
                                
                             </h3> */}
                            
                         </div>
                     </div>
                 </div>
                </div>
                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                    </a>
                  </div>   
                           
              
                  <div class="bg2">
                  <center><div className="column is-half">
                       <div className="blog-" >
                            {this.displayPost(this.state.posts)}

                        </div>
                    </div></center>
                   </div>

                    </div>
                )
            } else {
                return(
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
                         
                       </div>
                       <nav>
                               <div class="navbar-end" >
                                               <a  class="navbar-item">
                                                   <Link to ="/register">
                                                   <button className="button is-primary"> <MdAssignmentInd/>Register</button>
                                                   </Link>
                   
                                               </a>
                                       
                                               <a  class="navbar-item" >
                                                   <Link to ="/login">
                                                       <button className="button is-link"><IoIosLogIn/>Login</button>
                                                   </Link>  
                                               </a>
                                           </div>  
                           </nav>
                       </div>
                       </nav>
                    
                   
                   <div class="bg">
                   <center> <div className="column is-half">
                       <div className="blog-" >
                            {this.displayPost(this.state.posts)}

                        </div>
                    </div>
                    </center>
                   </div>


                  
                   
                          
                   
                          
                         
                       
            </div>

                    

                    
                
                    
                )
            }
        }
    
    }
export default Home