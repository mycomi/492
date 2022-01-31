import React from 'react'
import 'bulma/css/bulma.css'
import { Link,useParams } from 'react-router-dom';
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
        dorms: [],
        rooms: [],
        dormId: '',
        roomId: '',

    };

    componentDidMount = () => {
        this.getRooms();
    }

    displayRooms = (rooms) => {
        // if (!posts.length) return null;
        console.log(rooms)

        return rooms.map( (post,index) => (
            <div key={index} className="blog-post__display">
                <h2> Dorm id: {post.id} </h2>
                <h3> ชื่อหอ: {post.name } </h3>
                <p> ราคา/เดือน: {post.lowPrice} - {post.highPrice} </p>
                <Link to={{
                    pathname: "/dorm/"+post.id,
                }}>
                    <button className="button is-link">ดูหอ</button>
                </Link> 
                <p> --------------------------------------------------------------------------------------------- </p>
            </div>
        ))

    }

    getRooms = () =>{
        
        
        const partname = window.location.pathname.split('/');
        console.log(partname[2])
        Axios.get(`/auth/dorm/`+partname[2],{ 
            
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           this.setState({ rooms: data});
           console.log('GG');
           console.log("data"+data)

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })
    }

    book = () =>{
        const token = localStorage.getItem('token')
        Axios.get(`/auth/room`,{ 
            headers: {
                "access-token": token
            },
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           //this.setState({ dorms: data});
           alert("จองห้องสำเร็จ")
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
                <div id="navbar">
                     <Navbar />
                </div>

                <div class="bg2">
                    <center><div className="column is-half">
                        <div className="blog-" >
                            {this.displayRooms(this.state.rooms)}

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
                            <div class="navbar-item">
                                <Link to="/">
                                        <button className="button is-link"><TiHome/>Home</button>
                                </Link> 
                            </div>
                
                            {/* <div class="navbar-item">
                        
                                <Link to="/about">
                                    <button className="button is-warning"><TiUser/>  About</button>
                                </Link> 
                            </div> */}
                        
                        </div>
                        <div class="navbar-end" >
                            <div  class="navbar-item">
                                <Link to ="/register">
                                    <button className="button is-primary"> <MdAssignmentInd/>Register</button>
                                </Link>

                            </div>
                                
                            <div  class="navbar-item" >
                                <Link to ="/login">
                                    <button className="button is-link"><IoIosLogIn/>Login</button>
                                </Link>  
                            </div>
                        </div>  

                    </div>
                </nav>

                
                <div class="bg">
                    <center> <div className="column is-half">
                        <div className="blog-" >
                            {this.displayRooms(this.state.rooms)}
                        </div>
                    </div></center>
                </div>
         
            </div>
  
            )
        }
    }

}
export default Home