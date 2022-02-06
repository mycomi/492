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
                <h3> ชื่อหอ: {post.dorm } </h3>
                <p> เลขห้อง: {post.room} </p>
                {post.haveRoom &&
                    <button className="button is-link" onClick={this.dropRoom} > Drop </button>
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
                            {name}
                            <div className="blog-" >
                                {this.displayPost(this.state.room)}
                                
                            </div>
                            <button onClick={this.logout}>logout</button>
                        </div>
                    </center>
                </div>

            </div>



        );
         
    
    }
}
    
export default Profile_line