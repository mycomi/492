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
        isRoom: false,

    };

    componentDidMount = () => {
        this.getRooms();
        this.isRoom();
        console.log(this.state.isRoom);
    }

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

    displayRooms = (rooms) => {
        // if (!posts.length) return null;
        console.log(rooms)

        return rooms.map( (post,index) => (
            <from >
                <div key={index} className="blog-post__display">
                    <h2> Room id: {post.id} </h2>
                    <h2> Dorm id: {post.dorm_id} </h2>
                    <h3> เลขห้อง: {post.roomNum } </h3>
                    <p> ราคา/เดือน: {post.price}</p>

                    {!this.state.isRoom && localStorage.getItem('token') &&
                        <button className="button is-link" onClick={this.book} value={this.post = post}>จองห้อง</button>
                    }   

                    <p> ------------------------------------------------ </p>
                </div>
                

            </from>
            
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

    book = (e) =>{
        e.preventDefault();
        console.log(this.post)
        const token = localStorage.getItem('token')
        const data = {
            dormId: this.post.dorm_id,
            roomId: this.post.id
        }
        const header = {
            headers: {
                "access-token": token
            },
        }
        Axios.post(`/auth/room`,data,header)
        .then(res => {
           console.log(res.data)
           const data = res.data
           //this.setState({ dorms: data});
           alert("จองห้องสำเร็จ")

           window.location.reload(false); 

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })

    }

    isRoom = (e) =>{
        const token = localStorage.getItem('token')
        if(token){
            Axios.get(`/auth/isRoom`,{ 
                headers: {
                    "access-token": token
                }
            })
           .then(res => {
               console.log(res.data)
               const data = res.data
               this.setState({ isRoom: true});
               console.log('GG');
               console.log(this.state.isRoom)
           })
           .catch(() => {
               alert('isRoom')
           })

        }
        
    }

       
    
        
    
render() {  
    // const {message,currentUser} = this.state
    const IsRoom = true;
    if(this.state.rooms == null){
        IsRoom = false;
    }
        return(
            <div>
                <div id="navbar">
                     <Navbar />
                </div>

                <div class="bg2">
                    <center><div className="column is-half">
                        <div className="blog-" >
                            {(this.state.rooms).length > 0 
                                ? <div>{this.displayRooms(this.state.rooms)}</div>
                                : <h1>ไม่มีห้องว่าง</h1>
                            
                            }

                        </div>
                    </div></center>
                </div>

            </div>
        )
    } 
    

}
export default Home