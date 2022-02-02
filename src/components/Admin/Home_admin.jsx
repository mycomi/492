import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import Navbar_admin from './Navbar_admin'
import Axios from 'axios';

import '../style.css';


import { FaAndroid } from "react-icons/fa";

import { IoIosHome } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { TiHome } from "react-icons/ti";
// import firebase from '../firebase/firebase'
// import Background from './f14.png';
import { app } from 'firebase';
// import imges2 from './f14.png';
// import desktopImage from './f14.png';
// import mobileImage from './f14.png';
import { TiUser } from "react-icons/ti";


class Home_admin extends React.Component {

    state = {
        title: '',
        body: '',
        dorm: [],
        users: [],
        haveUsers: false,
        dormId: '',
        roomId: '',
        manageUser: false,

    };

    componentDidMount = () => {
        this.getDorm();
        
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

    displayDorm = (dorm) => {
        // if (!posts.length) return null;
        console.log(dorm)

        return dorm.map( (post,index) => (
            <div key={index} className="blog-post__display">
                <h3> ชื่อหอ: {post.dorm } </h3>
                <h2>id: {post.id} </h2>
                {/* <button className="button is-link" onClick={this.manage} value={this.post = post}>จัดการผู้ใช้</button> */}
                <p> ------------------------------------------------------ </p>
            </div>
        ))

    }

    displayUsers = (users) => {
        // if (!posts.length) return null;
        console.log(users)

        return users.map( (post,index) => (
            <div key={index} className="blog-post__display">
                <form value={this.post = post}>
                <h3> เลขห้อง: {post.room} </h3>
                <h2> ชื่อผู้เช่า: {post.user } </h2>
                <button className="button is-link" onClick={this.manage_pass}  >ยืนยัน</button>
                <button className="button is-danger" onClick={this.manage_fail} >ลบ</button>
                <p> ------------------------------------------------------ </p>

                </form>
                
                
            </div>
        ))

    }

    getDorm = () =>{
        const token = localStorage.getItem('token-admin')
        Axios.get(`/auth/admin/admin_dorm`,{ 
            headers: {
                "access-token": token
            }
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           this.setState({ dorm: data});
           this.getUsers()
           console.log('GG');
           console.log(data)

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })
    }

    getUsers = () =>{
        console.log(this.state.dorm)
        const dormId = this.state.dorm[0].id;
        console.log(dormId)
        Axios.post(`/auth/admin/getUsers`,{ 
            dormId: dormId,
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           this.setState({ users: data});
           this.setState({ haveUsers: data[0].haveUsers});
           console.log('GG');
           console.log(data)

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })
    }

    manage_pass = (e) =>{
        e.preventDefault();
        console.log(this.post)
        const roomId = this.post.roomId
        console.log(roomId)
        Axios.post(`/auth/admin/user_pass`,{ 
            roomId: roomId,
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           alert("user approve")

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })

    }

    manage_fail = (e) =>{
        e.preventDefault();
        console.log(this.post)

    }



render() {
    // const {message,currentUser} = this.state


        return(
            <div>
                <div id="navbar">
                     <Navbar_admin />
                </div>

                <div className="bg2">
                    <center><div className="column is-half">
                        <div className="blog-" >
                            <h1>admin</h1>
                            {this.displayDorm(this.state.dorm)}
                            {this.state.haveUsers && 
                                
                                this.displayUsers(this.state.users)

                            }
                            
                            
                            

                        </div>
                    </div></center>
                </div>

            </div>
        )
    
    }

}
export default Home_admin