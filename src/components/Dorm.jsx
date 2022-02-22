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
class Dorm extends React.Component {
    
    state = {
        title: '',
        body: '',
        dorms: [],
        rooms: [],
        dormId: '',
        roomId: '',
        isRoom: false,

        photos:[],

    };

    componentDidMount = () => {
        this.getRooms();
        this.isRoom();
        this.getPhotos();
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

        if(rooms.length > 0){
            return rooms.map( (post,index) => (
                <div>
                    <br></br>
                    <div className="card" style={{ width: '18rem',height: 'auto'}}>
                        <div key={index} className="card-content">
                            <div className="content" >
                                {/* <h2 className="card-header-title-center"> Room id: {post.id} </h2>
                                <h2> Dorm id: {post.dorm_id} </h2> */}
                                <h3> เลขห้อง: {post.roomNum } </h3>
                                <p> ราคา/เดือน: {post.price}</p>
    
                                {!this.state.isRoom && localStorage.getItem('token') &&
                                    <button className="button is-link" onClick={this.book} value={this.post = post}>จองห้อง</button>
                                }   
                                <br></br>
                                {/* <p> ------------------------------------------------ </p> */}
                                
                            </div>
                            <footer className="card-footer">
                                {/* <p> ------------------------------------------------------ </p> */}
                            </footer>
                        </div>
                    </div>
                    
                </div>
    
                
            ))

        }else{
            console.log("noroom")
            return (
                
                <div style={{height:'200px'}}>
                    
                    <h1>ไม่มีห้องว่าง</h1>
                    
                </div>
            )
        }
        

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

    getPhotos = () => {

        const partname = window.location.pathname.split('/');
        console.log(partname[2])
        Axios.get(`/auth/get_photo/`+partname[2],{ 
            
        })
        .then(res => {
            console.log(res.data)
            const data = res.data
            this.setState({ photos: data});

        })
        .catch(e => {
        //    alert('help')
        console.log(e)
        })

        
    }

    displayPhotos = (photos) => {
        console.log(photos)
        if(photos){
            return photos.map( (photo,index) => (
                <div>
                    <br></br>

                    <div className="card" style={{ width: '40rem',height: '40rem',justifyContent: 'center', alignItems: 'center'}}>
                        <div key={index} className="card-content">
                            <div className="content" >
                                <img src={photo.imageUrl} style={{ width: '80%' }}></img>
                                
                            </div>
                            <footer className="card-footer" style={{justifyContent: 'center'}}>
                                
  
                            </footer>
                        </div>
                    </div>

                    
                </div>

            ))

        }
        
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

                {/* <div class="bg2">
                    <center><div className="column is-half">
                        <div className="blog-" >
                            {(this.state.rooms).length > 0 
                                ? <div>{this.displayRooms(this.state.rooms)}</div>
                                : <h1>ไม่มีห้องว่าง</h1>
                            
                            }

                        </div>
                    </div></center>
                </div> */}
                <div className="bg_card" >
                    <br></br>
                    <center>
                        <h1> รายชื่อห้อง </h1>
                        <div className="wrapper " >
                            
                            {this.displayRooms(this.state.rooms)}
                        </div>
                        
                        <br></br>
                        <h1> รูปเพิ่มเติม </h1>
                        <div className="wrapper2 " >
                            
                            {this.displayPhotos(this.state.photos)}
                        </div>
                        
                        
                    </center>
                    
                    <br></br>
                    {/* <div className="bar"></div> */}


                </div>

            </div>
        )
    } 
    

}
export default Dorm