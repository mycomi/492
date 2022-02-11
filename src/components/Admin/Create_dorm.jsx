import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import Navbar_admin from './Navbar_admin'
import Axios from 'axios';

import '../style.css';


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
        show: false,

        card: [],



    };

    

    componentDidMount = () => {

        
    }

    displayForms = (cards) => {
        // if (!posts.length) return null;

        console.log("cards: "+cards)
        
        if(cards){
            return cards.map( (card,index) => (
                <div>
                    <br></br>
                    <div className="card" style={{ width: '18rem' }}>
                        <div key={index} className="card-content" >
                            <h2 > ชั้นที่: {card[0]}</h2>
                                <div className="content" >
                                    <p > เลขห้อง: </p>
                                    <input className="input" type="number" name="room" value={(card[0]*100)+card[1]} required></input>
                                    {console.log(card[index])}
                                    <p> ราคา/เดือน:  </p>
                                    <input className="input" type="number" name="price" value={1000} required></input>

                                </div>
                            <footer className="card-footer">
                                {/* <p> ------------------------------------------------------ </p> */}
                            </footer>
                                
                        </div>
                    
                    </div>

                    {/* <br></br> */}
                </div>
                

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


    onSubmit = e => {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        Axios.post(`/auth/admin/register/`,{ 
            name: user.name,
            email: user.email,
            password: user.password
         })
        .then(res => {
            // console.log(res)
            console.log(res)
            console.log(res.data)
            
            
            alert("register success")

            // localStorage.setItem('token',res.data)
            
            
            // const token = localStorage.getItem('token')
            // Axios.get(`http://localhost:3000/api/users/me`,{
            //     token: token 
            // }).then(res => {
            //     console.log(res)
            //     console.log(res.data)
            // })
            
        })
        .then(() => this.setState(() => ({
            toDashboard: true
          })))
        .catch(e => {
            console.log(e)
            console.log(user.email)
            console.log(user.password)
            // alert('มีผู้ใช้นี้แล้ว')
        })

    }

    onHandle = e =>{
        e.preventDefault();

        const rooms = parseInt(this.state.rooms);
        const floors = parseInt(this.state.floors);

        // var card = new Array(rooms*floors)

        // card[0][0] = '1';

        // console.log(card[0])

        // const card = {
        //     name: this.state.name,
        //     floor: this.state.email,
        //     password: this.state.password
        // }
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







render() {
    // const {message,currentUser} = this.state
    const rooms = parseInt(this.state.rooms);
    const floors = parseInt(this.state.floors);

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
                                    <label className="label" htmlFor=""></label>
                                    <input type="checkbox" name="isPet" onChange={this.onChange} ></input>
                                    <label  htmlFor=""> สามารถเลี้ยงสัตว์ได้</label>
                                </div>

                                <div className="control">
                                    <label className="label" htmlFor=""></label>
                                    <input type="checkbox" name="isAir" onChange={this.onChange} ></input>
                                    <label htmlFor=""> มีเครื่องปรับอากาศ</label>
                                </div>


                            </div>

                            <div className="field is-grouped">
                                <div className="control">

                                    <button className="button is-link">Next</button>

                                </div>

                                <div className="control">

                                    <button className="button is-light" type="reset">Reset</button>

                                </div>
                            </div>


                            {/* <Link to ="/admin/login">
                                <button className="button is-success">Login</button>
                            </Link>  */}
                        </form>

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