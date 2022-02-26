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
                <div className="card" style={{ width: '40rem',height: 'auto'}}>
                    <div key={index} className="card-content">
                        <div className="content" >
                            <h3 className="card-header-title-center"> 
                            {post.dormId 
                                ? <a href={`/dorm/`+post.dormId}>ชื่อหอ: {post.dorm } </a> 
                                : <p>ชื่อหอ: {post.dorm }</p>
                            }
                            
                            </h3>
                            <h4> เลขห้อง: {post.room} </h4>
                            {post.price &&
                                <h4> ราคา: {post.price} บาท/เดือน</h4>
                            }
                            
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
                            
                        </div>
                        <footer className="card-footer">
                            {/* <p> ------------------------------------------------------ </p> */}
                        </footer>
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
                <div className="bg" >
                    <div className="Profile" >
                        <Navbar />

                        <center> 
                            <div className="column is-half" >
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