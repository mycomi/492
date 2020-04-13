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
        posts: []
    };

    componentDidMount = () => {
        this.getPost();
    }

    displayPost = (posts) => {
        // if (!posts.length) return null;

        return posts.map( (post,index) => (
            <div key={index} className="blog-post__display">
                 <h3> ชื่อหอ: {post.Aname } </h3>
                <p> ราคา/เดือน: {post.price} </p>
                <p> ที่อยู่: {post.address} </p>
                <p> รายละเอียด: {post.info} </p>
                <p> ติดต่อ: {post.tel} </p>
                <p> --------------------------------------------------------------------------------------------- </p>
            </div>
        ))

    }

    getPost = () =>{
        const token = localStorage.getItem('token')
        Axios.get(`http://localhost:3000/api/items`,{ 
            params: {
                token: token
              }
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           this.setState({ posts: data});
           console.log('GG');
           console.log(data)
       })
       .catch(() => {
           alert('help')
       })
    }




        render()  {
            console.log(this.state.posts);
            if (localStorage.getItem('token')){
                return(
                    <div class="bg">
                    <div className="Profile">
                        <Navbar />
                        
                        

                        
                   <center> 
                   <div className="column is-half">
                       <div className="blog-" >
                            {this.displayPost(this.state.posts)}

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