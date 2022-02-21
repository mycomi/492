import React from 'react'
import 'bulma/css/bulma.css'
import { Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar'
import Axios from 'axios';

import { TiHome } from "react-icons/ti";


// import firebase from '../firebase/firebase'
// import Navbar from './Navbar'
// import MessageList from './MessageList'

class Profile extends React.Component {
    
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
        const temp = this.state.room;
        console.log(room)
        return room.map( (post,index) => (
            <div>
                <br></br>
                <div className="card" style={{ width: '18rem',height: 'auto'}}>
                    <div key={index} className="card-content">
                        <div className="content" >
                            <h3 className="card-header-title-center"> <a href={`/dorm/`+post.dormId}>ชื่อหอ: {post.dorm } </a> </h3>
                            <p> เลขห้อง: {post.room} </p>
                            {post.Isconfirm
                                ?   <button className="button is-link" disabled style={{backgroundColor: 'lightgreen'}}> ยืนยันแล้ว </button>
                                :   post.haveRoom &&
                                    <button className="button is-link" onClick={this.dropRoom} > Drop </button>
                            }
                            <p> --------------------------------------------- </p>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }


    getPost = () =>{
        const token = localStorage.getItem('token')
        if(token){
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
               alert('getPost')
           })

        }
        
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
           alert('dropRoom')
       })

    }

    render()  {
        console.log(this.state.room);
        if (localStorage.getItem('token')){
            return(
                <div className="bg">
                    <div className="Profile">
                        <Navbar />

                        <center> 
                            <div className="column is-half">
                                <div className="blog-" >
                                    <h1> หอพักของฉัน </h1>
                                    <br></br>
                                    {this.displayPost(this.state.room)}

                                </div>
                            </div>
                        </center>
                    </div>

                </div>

            );
        } else {
            return(
                Redirect('/')
            
            )
        }
    
    }
}
    
export default Profile