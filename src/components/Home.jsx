import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import Axios from 'axios';

import { Card } from 'react-bootstrap';

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

class Home extends React.Component {

    state = {
        title: '',
        body: '',
        dorms: [],
        rooms: [],
        dormId: '',
        roomId: '',

    };

    componentDidMount = () => {
        this.getDorms();
        
        
    }


    displayDorms = (dorms) => {
        // if (!posts.length) return null;
        console.log(dorms)

        return dorms.map( (post,index) => (
            <div className="card">
                <div key={index} className="card-content" >
                    <h2 > Dorm id: {post.id} </h2>
                        <div className="content" >
                            <h3 className="card-header-title-center"> ชื่อหอ: {post.name } </h3>
                            <p> ราคา/เดือน: {post.lowPrice} - {post.highPrice} </p>
                            <Link to={{ pathname: "/dorm/"+post.id }}>
                                <button className="button is-link" style={{backgroundColor: "green"}}>ดูหอ</button>
                            </Link> 
                        </div>
                    <footer className="card-footer">
                        {/* <p> ------------------------------------------------------ </p> */}
                    </footer>
                        
                </div>

            </div>
            
        ))

    }

    getDorms = () =>{
        Axios.get(`/auth/dormsAll`,{ 
            
        })
       .then(res => {
           console.log(res.data)
           const data = res.data
           this.setState({ dorms: data});
           console.log('GG');
           console.log(data)

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })
    }

    


render() {
    // const {message,currentUser} = this.state


        return(
            
            <div>
                <div id="navbar">
                     <Navbar />
                </div>

                <div id="filter">
                    
                </div>

                <div className="bg2">

                    <center><div className="column is-half" style={{ width: '18rem' }}>
                        <div className="blog-" >
                            {this.displayDorms(this.state.dorms)}
                        </div>
                    </div></center>
                </div>

            </div>

            
        )
    }

}
export default Home