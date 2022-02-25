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

import { app } from 'firebase';

import { TiUser } from "react-icons/ti";

class EditRoom_admin extends React.Component {
    
    state = {
        title: '',
        name: '',
        floors: 1,
        rooms: 1,
        prices: 0,
        phone: '',
        map: '',
        isPet: false,
        isAir: false,
        image: null,
        imageUrl: null,

        show: false,

        submit: false,

        card: [],

        toDashboard: false,

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

               this.getRooms();
           })
           .catch(e => {
            //    alert('help')
            console.log(e)
           })

        }
        
    }

    getRooms = () =>{
        
        
        // const partname = window.location.pathname.split('/');
        // console.log(partname[3])
        const token = localStorage.getItem('token-admin')
        console.log(this.state.dorm)
        const dormId = this.state.dorm[0].id
        const header = {
            headers: {
                "access-token": token
            },
        }
        Axios.post(`/auth/admin/admin_allRooms/`,{
            dormId: dormId,
        },header)
       .then(res => {
           console.log(res.data)
           const data = res.data
           this.setState({ card: data});

       })
       .catch(e => {
        //    alert('help')
        console.log(e)
       })
    }

    displayForms = (cards) => {
        // if (!posts.length) return null;
        const price = this.state.prices;
        // const isAir = this.state.isAir;
        // this.setState({
        //     submit: true
        // })
        console.log(cards)

        if(cards){
            
            return cards.map( (card,index) => (
                <form className="rooms" >
                    <br></br>
                    <div className="card" style={{ width: '18rem' }}>
                        <div key={index} className="card-content" >
                            <input type="hidden" id="roomId" name="roomId" value={card.id}></input>
                            <label><h2 > ชั้นที่: <input className="input" type="number" id="floor" name="floor" defaultValue={card.roomFloor} required></input></h2></label>
                                <div className="content" >
                                    <label > เลขห้อง: </label>
                                    <input className="input" type="number" id="room" name="room" defaultValue={card.roomNum} required></input>
                                    <label> ราคา/เดือน:  </label>
                                    <input className="input" type="number" id="price" name="price" defaultValue={card.price} required></input>
                                    {/* <label > มีเครื่องปรับอากาศ</label> */}
                                    {card.isAir === 1
                                        ? <div>
                                            <input type="radio" id="air1" name="air" value="1" defaultChecked></input>
                                            <label >มีเครื่องปรับอากาศ</label><br></br>
                                            <input type="radio" id="air2" name="air" value="0"></input>
                                            <label >ไม่มีเครื่องปรับอากาศ</label><br></br>
                                        </div>
                                        : <div>
                                            <input type="radio" id="air1" name="air" value="1" ></input>
                                            <label >มีเครื่องปรับอากาศ</label><br></br>
                                            <input type="radio" id="air2" name="air" value="0" defaultChecked></input>
                                            <label >ไม่มีเครื่องปรับอากาศ</label><br></br>
                                        </div>
                                    }
                                    
                                    
                                    
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

    onSubmit = async e => {
        e.preventDefault();
        // alert("onSubmit");
        // const room = document.getElementsByName("room");
        // const price = document.getElementsByName("price");
        const token = localStorage.getItem('token-admin')

        var roomId = document.querySelectorAll('input[name="roomId"]');
        var floors = document.querySelectorAll('input[name="floor"]');
        var rooms = document.querySelectorAll('input[name="room"]');
        var prices = document.querySelectorAll('input[name="price"]');
        var airs = document.querySelectorAll('input[name="air"]:checked');
        // console.log("air "+airs[0].value)

        var roomId_array = [];
        var floor_array = [];
        var room_array = [];
        var price_array = [];
        var air_array = [];

        roomId.forEach(id => {
            roomId_array.push([id.value])
        });

        floors.forEach(floor => {
            floor_array.push([floor.value])
        });

        rooms.forEach(room => {
            room_array.push([room.value])
        });

        prices.forEach(price => {
            price_array.push([price.value])
        });
        
        airs.forEach(air => {
            air_array.push([air.value]);
        })
        console.log("room "+room_array)
        console.log("air "+air_array)
 
        const data = {
            id: roomId_array,
            roomFloor: floor_array,
            roomNum: room_array,
            price: price_array,
            isAir: air_array,
        }
        console.log(data)
        const header = {
            headers: {
                "access-token": token
            },
        }
        console.log(this.state.imageUrl);
        Axios.post(`/auth/admin/edit_rooms/`,data,header)
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


render() {
    // const {message,currentUser} = this.state
    // const rooms = parseInt(this.state.rooms);
    const token = localStorage.getItem('token-admin')
    var floor = 2;
    var temps = []
    if (this.state.toDashboard === true || !token) {
        return <Redirect to='/admin' />
      }
    
      return(
        <div>
            <div id="navbar">
                 <Navbar_admin />
            </div>

            {this.state.card.map((object, i) => {
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
                            
                            {this.displayForms(temp)}
                        </div>
                        
                    )
                })

                : <div><h2 style={{color: 'red'}}>ไม่มีห้องว่าง</h2></div>
            }

            <center>
                <br></br>
                <button className="button is-light" type="button" onClick={this.onSubmit}>Submit</button>
                <br></br>
            </center>
                

        </div>
    )
        
    
    }

}
// export default Create_dorm

export default EditRoom_admin