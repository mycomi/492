import React from 'react'
import 'bulma/css/bulma.css'
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar'
import Axios from 'axios';

import { TiHome } from "react-icons/ti";


// import firebase from '../firebase/firebase'
// import Navbar from './Navbar'
// import MessageList from './MessageList'

class Profile_line extends React.Component {
    
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         items: [],   
    //     }
    // }
    state = {
        title: '',
        body: '',
        room: []
    };

    componentDidMount = () => {
        this.getPost();
    }

    displayPost = (room) => {
        // if (!posts.length) return null;
        console.log("room: "+this.state.room)

        return room.map( (post,index) => (
            
            <div key={index} className="blog-post__display">
                <br></br>
                <h3> ชื่อหอ: {post.dorm } </h3>
                <br></br>
                <p> เลขห้อง: {post.room} </p>
                <br></br>
                {post.price &&
                    <h4> ราคา: {post.price} บาท/เดือน</h4>
                }
                <br></br>
                {post.image &&
                    <img src={post.image} alt="dorm-image" style={{ width: '80%' }}></img>
                }
                <br></br>
                <br></br>
                {post.Isconfirm
                    ?   <button className="button is-link" disabled style={{backgroundColor: 'lightgreen'}}> ยืนยันแล้ว </button>
                    :   post.haveRoom &&
                        <div>
                            <p>รอการติดต่อจากเจ้าของหอ</p>
                            <br></br>
                            <button className="button is-danger" onClick={this.dropRoom} > ยกเลิกการจองห้อง </button>
                        </div>
                        
                }
                
                <p> --------------------------------------------- </p>
                
            </div>
        ))

    }

    getPost = () =>{
        const token = localStorage.getItem('token')
        Axios.get(`/auth/user_room`,{ 
            headers: {
                "access-token": token
            }
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           this.setState({ room: data});
           console.log('GG');
           console.log(data)
       })
       .catch(() => {
           alert('help')
       })
    }

    dropRoom = () => {
        const token = localStorage.getItem('token')
        Axios.get(`/auth/dropRoom`,{ 
            headers: {
                "access-token": token
            }
        })
       .then(res => {
           console.log(res)
           alert("ยกเลิกจองสำเร็จ")
           window.location.reload(false); 

       })
       .catch(() => {
           alert('help')
       })

    }

    logout = () =>{
        localStorage.clear('token')     
        window.location.reload(false);    
    }

    render()  {
        console.log(this.state.room);
        const name = localStorage.getItem('name')

        return(
            <div className="bg">
                <div className="Profile">
                    {/* <Navbar /> */}

                    <center> 
                        <div className="column is-half">
                            <br></br>
                            ผู้ใช้: {name}
                            
                            <div className="blog-" >
                                {this.displayPost(this.state.room)}
                                
                            </div>
                            
                            {/* <button onClick={this.logout}>logout</button> */}
                        </div>
                    </center>
                </div>

            </div>



        );
         
    
    }
}
    
export default Profile_line