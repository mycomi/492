import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
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
            <div key={index} className="blog-post__display">
                <h2> Dorm id: {post.id} </h2>
                <h3> ชื่อหอ: {post.name } </h3>
                <p> ราคา/เดือน: {post.lowPrice} - {post.highPrice} </p>
                <Link to={{ pathname: "/dorm/"+post.id }}>
                    <button className="button is-link">ดูหอ</button>
                </Link> 
                <p> ------------------------------------------------------ </p>
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

                <div className="bg2">
                    <center><div className="column is-half">
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