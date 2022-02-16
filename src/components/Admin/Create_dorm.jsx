import React from 'react'
import 'bulma/css/bulma.css'
import { Link,Redirect } from 'react-router-dom';
import Navbar_admin from './Navbar_admin'
import Axios from 'axios';

import '../style.css';

import firebase from '../firebase/firebase';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"

import { FaAndroid } from "react-icons/fa";

import { IoIosHome } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { TiHome } from "react-icons/ti";
// import firebase from '../firebase/firebase'
// import Background from './f14.png';
import { app } from 'firebase';
// import imges2 from './f14.png';
// import desktopImage from './f14.png';
// import mobileImage from './f14.png';
import { TiUser } from "react-icons/ti";

class Create_dorm extends React.Component {
    
    state = {
        title: '',
        name: '',
        floors: 1,
        rooms: 1,
        prices: 0,
        map: '',
        isPet: false,
        isAir: false,
        image: null,
        imageUrl: null,

        show: false,

        submit: false,

        card: [],

        toDashboard: false,

        showUploadButton: false,

        progress: "0",


    };

    componentDidMount = () => {

    }

    displayForms = (cards) => {
        // if (!posts.length) return null;
        const price = this.state.prices;
        // const isAir = this.state.isAir;
        // this.setState({
        //     submit: true
        // })

        if(cards){
            return cards.map( (card,index) => (
                <form className="rooms" onSubmit={this.handleSubmit}>
                    <br></br>
                    <div className="card" style={{ width: '18rem' }}>
                        <div key={index} className="card-content" >
                            <h2 > ชั้นที่: {card[0]}</h2>
                                <div className="content" >
                                    <p > เลขห้อง: </p>
                                    <input className="input" type="number" id="room" name="room" defaultValue={(card[0]*100)+card[1]} required></input>
                                    
                                    <p> ราคา/เดือน:  </p>
                                    <input className="input" type="number" id="price" name="price" defaultValue={price} required></input>
                                    {/* <div className="control">
                                        {isAir 
                                            ? <input type="checkbox" name="isAir" checked></input>
                                            : <input type="checkbox" name="isAir" ></input>
                                        }
                                        <input type="checkbox" name="isAir" ></input>
                                        <label > มีเครื่องปรับอากาศ</label>
                                        
                                    </div> */}

                                </div>
                            <footer className="card-footer">
                                {/* <p> ------------------------------------------------------ </p> */}
                            </footer>
                                
                        </div>
                    
                    </div>
                    {/* <button className="button is-link" name="card_submit" type="submit">submit</button> */}
                    
                    {/* <br></br> */}
                </form>

            ))

        }

    }

    onChange = e => {
        this.setState({
            show: false,
        })
        const {name,value} = e.target
        this.setState({
            [name]: value
            
        });
        console.log(this.state)
    }

    upload = (e) =>{
        let file = this.state.image;
        let token = localStorage.getItem('token-admin')
        let date = Date.now();
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child('images/'+token+ "/"+date+"_"+file.name).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>{
            var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
            this.setState({progress})
            },(error) =>{
            throw error
            },() =>{
            // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

            uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                this.setState({
                    imageUrl: url
                })
                console.log(url)
                alert("upload success")
            })
            // document.getElementById("file").value = null

        }) 
        
    }

    onSubmit = async e => {
        e.preventDefault();
        // alert("onSubmit");
        // const room = document.getElementsByName("room");
        // const price = document.getElementsByName("price");
        const token = localStorage.getItem('token-admin')

        var rooms = document.querySelectorAll('input[name="room"]');
        var prices = document.querySelectorAll('input[name="price"]');

        var room_array = [];
        var price_array = [];

        rooms.forEach(room => {
            room_array.push([room.value])
        });

        prices.forEach(price => {
            price_array.push([price.value])
        });
        
        console.log("room"+room_array)

        // const user = {
        //     name: this.state.name,
        //     email: this.state.email,
        //     password: this.state.password
        // }

        if(!this.state.imageUrl){
            alert("Please upload photo!!!")
            return
        }
        
        const data = {
            name: this.state.name,
            floors: this.state.floors,
            rooms: this.state.rooms,
            room: room_array,
            price: price_array,
            isPet: this.state.isPet,
            isAir: this.state.isAir,
            imageUrl: this.state.imageUrl,
        }
        const header = {
            headers: {
                "access-token": token
            },
        }
        console.log(this.state.imageUrl);
        Axios.post(`/auth/admin/add_dorm/`,data,header)
        .then(res => {
            
            // console.log(res)
            console.log(res)
            console.log(res.data)
            
            alert("success")
            this.setState({
                toDashboard: true,
            })
            window.location.reload(false);
            
        })
        // .then(() => this.setState(() => ({
        //     toDashboard: true
        //   })))
        .catch(e => {
            console.log(e)

            // alert('มีผู้ใช้นี้แล้ว')
        })

    }

    onHandle = e =>{
        e.preventDefault();

        const rooms = parseInt(this.state.rooms);
        const floors = parseInt(this.state.floors);

        var myArray = [];
        
        for(let j=1;j<=floors;j++){
            var temp = [];
            for(let i=1;i<=rooms;i++){
                temp.push([j,i]);
            }
            myArray.push([temp]);
        }
        console.log(myArray)

        this.setState({
            show: true,
            card: myArray,
        })

    }

    onToggle = e =>{
        // e.preventDefault();
        this.setState({
            show: false,
        })
        const {name} = e.target
        const prevCheck = this.state[name];
        this.setState({
            [name]: !prevCheck
        });
        console.log(this.state)

    }

    onHandleChange = e =>{
        if(e.target.files[0]){
            this.setState({ 
                image: e.target.files[0],
                showUploadButton : true,
            })
        }

        console.log("image: "+ this.state.image);
    }


render() {
    // const {message,currentUser} = this.state
    // const rooms = parseInt(this.state.rooms);
    if (this.state.toDashboard === true) {
        return <Redirect to='/admin' />
      }
    
        return(
            <div>
                <div id="navbar">
                     <Navbar_admin />
                </div>

                <div className="bg2">
                    <center><div className="column is-half">
                        <div className="blog-" >
                            <h1>Create_dorm</h1>

                            <form onSubmit={this.onHandle} > {/*action="http://localhost:3000/api/users"*/}

                            <div className="field">
                                
                                <div className="control">
                                    <label className="label" htmlFor="">ชื่อหอพัก</label>
                                    <input className="input" type="text" name="name" onChange={this.onChange} required></input>
                                </div>

                                <div className="control">
                                    <label className="label" htmlFor="">จำนวนชั้น</label>
                                    <input className="input" type="number" name="floors" min="1" max="10" onChange={this.onChange} required></input>
                                </div>

                                
                                <div className="control">
                                    <label className="label" htmlFor="">จำนวนห้อง</label> 
                                    <input className="input" type="number" name="rooms" min="1" max="30" onChange={this.onChange}  required></input>
                                </div>

                                
                                <div className="control">
                                    <label className="label" htmlFor="">ราคา</label>
                                    <input className="input" type="number" name="prices" onChange={this.onChange} required></input>
                                </div>

                                
                                <div className="control">
                                    <label className="label" htmlFor="">พิกัด</label>
                                    <input className="input" type="text" name="map" onChange={this.onChange} required></input>
                                </div>

                                <div className="control">
                                    <input type="checkbox" id="isPet" name="isPet" onChange={this.onToggle} ></input>
                                    <label  htmlFor=""> สามารถเลี้ยงสัตว์ได้</label>
                                </div>

                                <div className="control">
                                    <input type="checkbox" id="isAir" name="isAir" onChange={this.onToggle} ></input>
                                    <label htmlFor=""> มีเครื่องปรับอากาศ</label>
                                </div>

                                <div className="control">
                                    <br></br>
                                    <p > อัพโหลดรูปภาพ </p>
                                    <input type="file" onChange={this.onHandleChange} ></input>

                                    
                                </div>
                                <div className="control">
                                    <br></br>
                                    {this.state.showUploadButton &&
                                        <progress value={this.state.progress} max="100"></progress>
                                    }
                                    <br></br>
                                    {this.state.showUploadButton &&
                                        <button type="button" onClick={this.upload} >upload </button>
                                    }
                                    
                                    
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">

                                    <button className="button is-link" type="submit">Next</button>

                                </div>

                                <div className="control">

                                    <button className="button is-light" type="reset">Reset</button>

                                </div>

                            </div>


                            {/* <Link to ="/admin/login">
                                <button className="button is-success">Login</button>
                            </Link>  */}
                        </form>
                        <button className="button is-light" type="button" onClick={this.onSubmit}>Submit</button>

                        </div>
                    </div></center>
                    

                </div>
                    
                {this.state.show &&
                    this.state.card.map((object, i) => {
                        console.log(object[0]);
                        
                        return (
                            <div>
                                <div className="wrapper">
                                    
                                    {this.displayForms(object[0])}
                                </div>
                                <br></br>
                                <div className="bar"></div>
                            </div>
                        )
                        
                    })

                }

            </div>
        )
    
    }

}
export default Create_dorm