import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import Navbar_admin from './Navbar_admin'
import Axios from 'axios';

import '../style.css';


import { FaAndroid, FaBuilding } from "react-icons/fa";
import {MdPersonAdd, MdAddToPhotos} from "react-icons/md"
import { IoIosHome } from "react-icons/io";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { TiHome, TiUser } from "react-icons/ti";
// import firebase from '../firebase/firebase'
// import Background from './f14.png';
import { app } from 'firebase';
// import imges2 from './f14.png';
// import desktopImage from './f14.png';
// import mobileImage from './f14.png';


class Home_admin extends React.Component {

    state = {
        title: '',
        body: '',
        dorm: '',
        users: [],
        haveUsers: false,
        dormId: '',
        roomId: '',
        manageUser: false,

    };

    componentDidMount = () => {
        this.getDorm();
        
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
               this.getUsers()
               console.log('GG');
               console.log(data)
    
           })
           .catch(e => {
            //    alert('help')
            console.log(e)
           })

        }
        
    }

    displayDorm = (dorm) => {
        // if (!posts.length) return null;
        if(dorm){
            var dormId = this.state.dorm[0].id
            console.log(dormId)
            console.log(dorm);
            return dorm.map( (post,index) => (
                <div>
                    <div className="card" style={{ width: '600px',height: 'auto'}}>
                    <div key={index} className="card-content" >
                        <div className="content" >
                            <h3> ชื่อหอ: {post.dorm } </h3>
                            <br></br>
                            <img src={post.imageUrl} alt="firebase-image" style={{ width: '80%' }}></img>

                        </div>
                        <br></br>
                        <div>
                            <Link to={`/admin/add_users/`}>
                                <button className="button is-link"><MdPersonAdd/> &nbsp; เพิ่มผู้ใช้ </button>
                            </Link>
                            &nbsp;
                            &nbsp;
                            <Link to="/admin/add_photo">
                                <button className="button is-link"><MdAddToPhotos/> &nbsp; รูปเพิ่มเติม</button>
                            </Link>
                        </div>
                        
                        <br></br>
                    </div>
    
                </div>

                </div>

            ))

        }else{
            console.log("null");
            return (
                <div className="card" style={{ width: '18rem',height: '18rem'}}>
                    <div className="card-content">
                        <br></br>
                        <h2> ชื่อหอ: ไม่มีข้อมูลหอพัก </h2>
                        {/* <h2>id: {post.id} </h2> */}
                        {/* <button className="button is-link" onClick={this.manage} value={this.post = post}>จัดการผู้ใช้</button> */}
                        <br></br>
                        <Link to="/admin/create_dorm">
                            <button className="button is-link"><FaBuilding/>เพิ่มหอพัก</button>
                        </Link> 
                        
                        {/* <p> ------------------------------------------------------ </p> */}
                    </div>

                </div>
            )
            
        }
    }

    displayUsers = (users) => {
        // if (!posts.length) return null;
        console.log(users)
        const token = localStorage.getItem('token-admin');
        if(token){

            return users.map( (post,index) => (
                <div>
                    <br></br>
                    <div className="card" style={{ width: '18rem',height: 'auto'}}>
                        <div key={index} className="card-content">
                            <div className="content" >
                                <form >
                                <h3> เลขห้อง: {post.roomNum} </h3>
                                <p> ชื่อผู้เช่า: {post.name } </p>
                                <p> เบอร์โทรศัพท์: {post.phone } </p>
                                {post.status === 2 
                                    ?   <button className="button is-success is-light" disabled  >ยืนยันแล้ว</button>
                                    :   <button className="button is-success" onClick={() => this.manage_pass(post.id)}  >ยืนยัน</button>
                                }
                                &nbsp;&nbsp;&nbsp;
                                <button className="button is-danger" onClick={() => this.manage_fail(post.id)} >ลบ</button>
                                {/* <p> ------------------------------------------------------ </p> */}
                
                                </form>
                            </div>
                            <footer className="card-footer">
                                {/* <p> ------------------------------------------------------ </p> */}
                            </footer>
                        </div>
                        
                    </div>
                </div>
            ))

        }

    }

    

    getUsers = () =>{
        console.log(this.state.dorm)
        const dormId = this.state.dorm[0].id;
        console.log(dormId)
        if(this.state.dorm){
            Axios.post(`/auth/admin/getUsers`,{ 
                dormId: dormId,
            })
           .then(res => {
               console.log(res.data)
               const data = res.data
               this.setState({ users: data});
               this.setState({ haveUsers: true});
               console.log('GG');
               console.log(data)
    
           })
           .catch(e => {
            //    alert('help')
            console.log(e)
           })
        }
        
    }

    manage_pass(id){
        // e.preventDefault();
        // console.log(this.post)
        const roomId = id
        console.log(roomId)
        Axios.post(`/auth/admin/user_pass`,{ 
            roomId: roomId,
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           alert("user approve")
           window.location.reload(false); 

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })

    }

    manage_fail(id){
        // e.preventDefault();
        // console.log(this.post)
        const roomId = id
        console.log(roomId)
        Axios.post(`/auth/admin/user_fail`,{ 
            roomId: roomId,
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           alert("user drop")
           window.location.reload(false); 

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })

    }



render() {
    // const {message,currentUser} = this.state
    const token = localStorage.getItem('token-admin');
    
    
    if(token){
        return(
            <div>
                <div id="navbar">
                     <Navbar_admin />
                </div>

                {/* <div className="bg2" >
                    <center><div className="column is-half" style={{height:'700px'}}>
                        <div className="blog-" >
                            <br></br>
                            <h1>admin</h1>
                            <br></br>
                            {this.state.dorm &&
                            this.displayDorm(this.state.dorm)}
                            <br></br>
                            <br></br>
                            <label className="label"> รายชื่อผู้จองหอพัก </label>
                            

                            {this.state.haveUsers && 
                                
                                this.displayUsers(this.state.users)
                                
                            }

                        </div>
                    </div></center>
                </div> */}
                <center>
                <div className="bg2" >
                    <br></br>

                    <h1 className="filterHeader" style={{backgroundColor:'white'}}>admin</h1>
                    
                    <br></br>
                        <div className="" >

                            {/* {this.state.dorm &&
                            this.displayDorm(this.state.dorm)} */}
                            {this.displayDorm(this.state.dorm)}
                        </div>

                    {/* <div className="bar"></div> */}
                    <br></br>
                        <h1 className="filterHeader" style={{backgroundColor:'white'}}> รายชื่อผู้จองหอพัก </h1>
                                
                            <div className="wrapper " >
                                {this.state.haveUsers && 
                                    
                                    this.displayUsers(this.state.users)
                                    
                                }
                            </div>
                    <br></br>

                </div>
                
                </center>
            </div>
            
        )
        
    }else{
        return(
            <div>
                <div id="navbar">
                     <Navbar_admin />
                </div>

                <div className="bg2" >
                    <center><div className="column is-half" style={{height:'700px'}}>
                        <div className="blog-" >
                            <br></br>
                            <h1>admin</h1>
                            <br></br>
                            กรุณาสมัครสมาชิก หรือ เข้าสู่ระบบก่อนใช้งาน

                        </div>
                    </div></center>
                </div>

            </div>
        )

    }
        
    
    }

}
export default Home_admin