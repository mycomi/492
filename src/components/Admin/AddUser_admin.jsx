import React from 'react'
import 'bulma/css/bulma.css'
import { Link,useParams } from 'react-router-dom';
import Navbar from './Navbar_admin'
import Axios from 'axios';

import '../style.css';


import { FaAndroid } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { TiHome } from "react-icons/ti";
// import firebase from '../firebase/firebase'
import { app } from 'firebase';

import { TiUser } from "react-icons/ti";
// import firebase from '../firebase/firebase'


// import Navbar from './Navbar'
// import MessageList from './MessageList'
class AddUser_admin extends React.Component {
    
    state = {
        title: '',
        body: '',
        dorm: '',
        rooms: [],
        dormId: '',
        roomId: '',
        // isRoom: false,

    };

    componentDidMount = () => {
        this.getDorm();
        
        // this.isRoom();
        // console.log(this.state.isRoom);
    }

    

    getDorm = () =>{
        const token = localStorage.getItem('token-admin')
        if(token){
            Axios.get(`/auth/admin/admin_dorm`,{ 
                headers: {
                    "access-token": token
                }
            })
           .then(res => {
               console.log(res.data)
               const data = res.data
               this.setState({ dorm: data});
            //    this.getUsers()
               console.log('GG');
               console.log(data)
               this.getRooms();
           })
           .catch(e => {
            //    alert('help')
            console.log(e)
           })

        }
        
    }

    getRooms = () =>{
        
        
        // const partname = window.location.pathname.split('/');
        // console.log(partname[3])
        console.log(this.state.dorm)
        const dormId = this.state.dorm[0].id
        Axios.post(`/auth/admin/admin_rooms/`,{
            dormId: dormId,
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

    displayRooms = (rooms) => {
        // if (!posts.length) return null;
        console.log(rooms)

        return rooms.map( (post,index) => (
            <div>
                <br></br>
                <div className="card" style={{ width: '18rem',height: 'auto'}}>
                    <div key={index} className="card-content">
                        <div className="content" >
                            {/* <h2 className="card-header-title-center"> Room id: {post.id} </h2>
                            <h2> Dorm id: {post.dorm_id} </h2> */}
                            <h2> เลขห้อง: {post.roomNum } </h2>
                            <p> ราคา/เดือน: {post.price}</p>

                            {localStorage.getItem('token-admin') &&
                                <button className="button is-success" onClick={this.book} value={this.post = post}>เพิ่มผู้เช่า</button>
                            }   

                            {/* <p> ------------------------------------------------ </p> */}
                        </div>
                        <footer className="card-footer">
                            {/* <p> ------------------------------------------------------ </p> */}
                        </footer>
                    </div>
                </div>
                
            </div>

            
        ))

    }

    

    book = (e) =>{
        e.preventDefault();
        console.log(this.post)
        const token = localStorage.getItem('token-admin')
        const data = {
            dormId: this.post.dorm_id,
            roomId: this.post.id
        }
        const header = {
            headers: {
                "access-token": token
            },
        }
        Axios.post(`/auth/admin/add_user`,data,header)
        .then(res => {
           console.log(res.data)
           const data = res.data
           //this.setState({ dorms: data});
           alert("เพิ่มผู้เช่าสำเร็จ")

           window.location.reload(false); 

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })

    }

    // isRoom = (e) =>{
    //     const token = localStorage.getItem('token')
    //     if(token){
    //         Axios.get(`/auth/isRoom`,{ 
    //             headers: {
    //                 "access-token": token
    //             }
    //         })
    //        .then(res => {
    //            console.log(res.data)
    //            const data = res.data
    //            this.setState({ isRoom: true});
    //            console.log('GG');
    //            console.log(this.state.isRoom)
    //        })
    //        .catch(() => {
    //            alert('isRoom')
    //        })

    //     }
        
    // }

    
render() {  
    // const {message,currentUser} = this.state
    // const IsRoom = true;
    // if(this.state.rooms == null){
    //     IsRoom = false;
    // }
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
                        <br></br>
                        <p> คลิ๊กที่ปุ่ม เพิ่มผู้เช่า เพื่อเพิ่มผู้เช่าที่ไม่ได้เช่าผ่านเว็บไซต์</p>
                        <div className="wrapper " >
                            
                            {this.displayRooms(this.state.rooms)}
                        </div>
                    </center>
                    
                    <br></br>
                    {/* <div className="bar"></div> */}


                </div>

            </div>
        )
    } 
    

}
export default AddUser_admin