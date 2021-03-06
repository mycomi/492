import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import Navbar_admin from './Navbar_admin'
import Axios from 'axios';

import '../style.css';

import { FaAndroid, FaBuilding } from "react-icons/fa";
import {MdPersonAdd, MdAddToPhotos} from "react-icons/md"
import {BiBuildingHouse} from "react-icons/bi"
import { IoIosHome } from "react-icons/io";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { TiHeartOutline, TiHome, TiUser } from "react-icons/ti";
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
                            <h3> ??????????????????: {post.name } </h3>
                            <br></br>
                            <img src={post.imageUrl} alt="firebase-image" style={{ width: '80%' }}></img>

                        </div>
                        <br></br>
                        <div>
                            <Link to={`/admin/add_users/`}>
                                <button className="button is-link"><MdPersonAdd/> &nbsp; ????????????????????????????????? </button>
                            </Link>
                            &nbsp;
                            &nbsp;
                            <Link to="/admin/edit_room">
                                <button className="button is-link"><FaBuilding/> &nbsp; ???????????????????????????????????? </button>
                            </Link>
                            &nbsp;
                            &nbsp;
                            <Link to="/admin/add_photo">
                                <button className="button is-link"><MdAddToPhotos/> &nbsp; ???????????????????????????????????? </button>
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
                        <h2> ??????????????????: ???????????????????????????????????????????????? </h2>
                        {/* <h2>id: {post.id} </h2> */}
                        {/* <button className="button is-link" onClick={this.manage} value={this.post = post}>????????????????????????????????????</button> */}
                        <br></br>
                        <Link to="/admin/create_dorm">
                            <button className="button is-link"><FaBuilding/>??????????????????????????????</button>
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
                                <h3> ?????????????????????: {post.roomNum} </h3>
                                <p> ?????????????????????????????????: {post.name } </p>
                                <p> ????????????: {post.price } ?????????/??????????????? </p>
                                <p> ???????????????????????????????????????: {post.phone } </p>
                                {post.status === 2 
                                    ?   <button className="button is-success is-light" disabled  >??????????????????????????????</button>
                                    :   <button className="button is-success" onClick={() => this.manage_pass(post.id)}  >??????????????????</button>
                                }
                                &nbsp;&nbsp;&nbsp;
                                <button className="button is-danger" onClick={() => this.manage_fail(post.id)} >??????</button>
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
        const token = localStorage.getItem('token-admin')
        console.log(this.state.dorm)
        const dormId = this.state.dorm[0].id;
        console.log(dormId)
        const header = {
            headers: {
                "access-token": token
            },
        }
        if(this.state.dorm){
            
            Axios.post(`/auth/admin/getUsers`,{
                dormId: dormId,
            },header)
           .then(res => {
               console.log(res.data)
               const data = res.data
               this.setState({ users: data});
               this.setState({ haveUsers: true});
    
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
        const token = localStorage.getItem('token-admin')
        const roomId = id
        console.log(roomId)
        const header = {
            headers: {
                "access-token": token
            },
        }
        Axios.post(`/auth/admin/user_pass`,{ 
            roomId: roomId,
        },header)
        .then(res => {
           console.log(res.data)
           const data = res.data
           alert("??????????????????????????????????????????????????????")
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
        const token = localStorage.getItem('token-admin')
        const roomId = id
        console.log(roomId)
        const header = {
            headers: {
                "access-token": token
            },
        }
        Axios.post(`/auth/admin/user_fail`,{ 
            roomId: roomId,
        },header)
        .then(res => {
           console.log(res.data)
           const data = res.data
           alert("??????????????????????????????????????????????????????")
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
    var floor = 2;
    var temps = []
    const dorm = this.state.dorm
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
                            <label className="label"> ?????????????????????????????????????????????????????? </label>
                            

                            {this.state.haveUsers && 
                                
                                this.displayUsers(this.state.users)
                                
                            }

                        </div>
                    </div></center>
                </div> */}
                <center>
                <div className="bg2" >
                    <br></br>

                    <h1 className="filterHeader" style={{backgroundColor:'white'}}>????????????????????????????????????</h1>
                    
                    <br></br>
                        <div className="" >

                            {/* {this.state.dorm &&
                            this.displayDorm(this.state.dorm)} */}
                            {this.displayDorm(this.state.dorm)}
                        </div>

                    {/* <div className="bar"></div> */}
                    <br></br>

                    <div className="header2"> ?????????????????????????????????????????? </div>
                    {this.state.dorm && 
                    
                        <div style={{width:'80%', backgroundColor:"hsl(0, 0%, 96%)"}}>
                            <br></br>
                            <img src={dorm[0].imageFloorUrl} style={{ width: '80%' }}></img>
                            <label></label>
                        </div>
                    
                    }            
                    
                    <br></br>

                    <h1 className="filterHeader" style={{backgroundColor:'white'}}> ?????????????????????????????????????????????????????? </h1>
                            
                        {/* <div className="wrapper " >
                            {this.state.haveUsers && 
                                
                                this.displayUsers(this.state.users)
                                
                            }
                        </div> */}
                        {this.state.users.map((object, i) => {
                            console.log(object.roomFloor);
                            temps.push( [] );
                            if(object.roomFloor < floor ){
                                temps[object.roomFloor-1].push(object);
                            }else{
                                while(object.roomFloor >= floor){
                                    floor++
                                    temps.push( [] );
                                }
                                temps[object.roomFloor-1].push(object);
                            }
                        })}

                        {temps.length > 0 
                            ? temps.map((temp, i) => {
                                return (
                                    
                                    <div className="wrapper">
                                        
                                        {this.displayUsers(temp)}
                                    </div>
                                    
                                )
                            })

                            : <div>
                                <br></br>
                                <h2 style={{color: 'red'}}>??????????????????????????????????????????????????????</h2>
                            </div>
                        }
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
                            <h1>????????????????????????????????????</h1>
                            <br></br>
                            ???????????????????????????????????????????????? ???????????? ???????????????????????????????????????????????????????????????

                        </div>
                    </div></center>
                </div>

            </div>
        )

    }
        
    
    }

}
export default Home_admin