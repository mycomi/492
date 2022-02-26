import React from 'react'
import 'bulma/css/bulma.css'
import { Link,useParams } from 'react-router-dom';
import Navbar from './Navbar'
import Axios from 'axios';

import './style.css';


import { FaAndroid,FaRegSnowflake } from "react-icons/fa";
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
        dorm: [''],
        rooms: [],
        dormId: '',
        roomId: '',
        isRoom: false,

        photos:[],

    };

    componentDidMount = () => {
        this.getDorm();
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
        console.log(this.state.isRoom);
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
                                <p> ราคา: {post.price} บาท/เดือน</p>
                                {post.isAir 
                                    ? <p style={{color :'hsl(171, 100%, 29%)'}}><FaRegSnowflake />  มีเครื่องปรับอากาศ</p>
                                    : <p style={{color :'hsl(348, 100%, 61%)'}}> <FaRegSnowflake />  ไม่มีเครื่องปรับอากาศ</p>
                                }
    
                                {!this.state.isRoom && localStorage.getItem('token') &&
                                    <button className="button is-link" onClick={() => this.book(post)}>จองห้อง</button>
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
            // console.log("noroom")
            return (
                
                <div >
                    
                    {/* <h1>ไม่มีห้องว่าง</h1> */}
                    
                </div>
            )
        }
        

    }

    getDorm = () =>{
        const partname = window.location.pathname.split('/');
        console.log(partname[2])
        Axios.get(`/auth/dorm/`,{ 
            params: {
                dormId: partname[2]
            }
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           this.setState({ dorm: data});


       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })

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

    book(post){
        // e.preventDefault();
        // console.log(this.post)
        const token = localStorage.getItem('token')
        const data = {
            dormId: post.dorm_id,
            roomId: post.id
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
            //    alert('isRoom')
            console.log('noRoom');
           })

        }
        
    }

    
render() {  
    // const {message,currentUser} = this.state
    const dorm = this.state.dorm
    var floor = 2;
    var temps = []
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
                <div className="bg2" >
                    <br></br>
                    <center>
                        <div className="header">
                            <h1>หอพัก {dorm[0].name}</h1>
                        </div>
                        <br></br>
                        <div style={{width:'80%', backgroundColor:"hsl(0, 0%, 96%)"}}>
                        <br></br>
                        <h2> รายชื่อห้อง </h2>

                        {this.state.rooms.map((object, i) => {
                            console.log(object.roomFloor);
                            temps.push( [] );
                            if(object.roomFloor < floor ){
                                temps[object.roomFloor-1].push(object);
                            }else{
                                while(object.roomFloor >= floor){
                                    floor++
                                    temps.push( [] );
                                }
                                temps[object.roomFloor-1].push(object);
                            }
                        })}

                        {temps.length > 0 
                            ? temps.map((temp, i) => {
                                return (
                                    
                                    <div className="wrapper">
                                        
                                        {this.displayRooms(temp)}
                                    </div>
                                    
                                )
                            })

                            : <div><h2 style={{color: 'red'}}>ไม่มีห้องว่าง</h2></div>
                        }

                        <br></br>
                        
                        </div>

                        <br></br>

                        <div className="header2"> รูปแผนผังหอพัก </div>
                        <div style={{width:'80%', backgroundColor:"hsl(0, 0%, 96%)"}}>
                            <br></br>
                            <img src={dorm[0].imageFloorUrl} style={{ width: '80%' }}></img>
                            <label></label>
                        </div>

                        <br></br>
                        <div className="header2"> รูปเพิ่มเติม </div>

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