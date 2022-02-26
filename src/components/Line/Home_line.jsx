import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import Profile_line from './Profile_line'
import Register_line from './Register_line'
import Login_line from './Login_line'
import Axios from 'axios';

import '../style.css';


import { FaAndroid } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { TiHome } from "react-icons/ti";
// import firebase from '../firebase/firebase'

import { TiUser } from "react-icons/ti";
// import firebase from '../firebase/firebase'


class Home_line extends React.Component {

    state = {
        title: '',
        body: '',
        dorms: [],
        rooms: [],
        dormId: '',
        roomId: '',
        register: false,
        login: false,

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

    register =()=>{
        this.setState({register: true});
        this.setState({login: false});
    }

    login =()=>{
        const line_id = window.location.pathname.split('/');
        console.log(line_id[2])
        const user = {
            line_id: line_id[2],
        }

        Axios.post(`/auth/isLine`,{ 
            line_id: user.line_id,
         })
        .then(res => {
            // console.log(res)
            console.log(res)
            console.log(res.data)
            
            window.localStorage.setItem('token', res.data.acsessToken)
            window.localStorage.setItem('name', res.data.name)
            alert("login success")

            // localStorage.setItem('token',res.data)
            window.location.reload(false); 
            // const token = localStorage.getItem('token')
            // Axios.get(`http://localhost:3000/api/users/me`,{
            //     token: token 
            // }).then(res => {
            //     console.log(res)
            //     console.log(res.data)
            // })
            
        })
        .catch(e => {
            console.log(e)
            // alert("error")
            this.setState({login: true});
            this.setState({register: false});
        })

        
    }

    


render() {
    // const {message,currentUser} = this.state
    const line_id = window.location.pathname.split('/');
    console.log(line_id[2])

    if(this.state.register){
        return(
            <div>
                <Register_line/>
            </div>
            
        )
    }

    if(this.state.login){
        return(
            <div >
                <Login_line/>
            </div>
            
        )
    }


    if(localStorage.getItem('token')){
        return(
            <div>

                <div className="bg2">
                    <center><div className="column is-half">
                        <div className="blog-" >
                            {/* {this.displayDorms(this.state.dorms)} */}
                            <Profile_line/>


                        </div>
                    </div></center>
                </div>

            </div>
        )

    }else{
        return(
            <div>

                <div className="bg2" style={{
                    
                    height: '800px',width: '1900px',
                }}>
                    <center>
                        <div className="column is-half" style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)',
                            
                        }}>
                        <div className="blog-" >
                            {/* {this.displayDorms(this.state.dorms)} */}

                            <div id="register">

                                <button className="button is-warning" onClick={this.register}> สมัครสมาชิก</button>

                            </div>

                            <div>  &nbsp;  </div>

                            <div id="login">

                                <button className="button is-warning" onClick={this.login}> เข้าสู่ระบบ</button>

                            </div>
                            


                        </div>
                    </div>
                    </center>
                </div>

            </div>
        )

    }
        
    }

}
export default Home_line