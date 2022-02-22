import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import Axios from 'axios';

// import { Card } from 'react-bootstrap';

import './style.css';



import { FaAndroid,FaRegSnowflake } from "react-icons/fa";
import { MdAssignmentInd,MdPets} from "react-icons/md";
import {GrMap} from "react-icons/gr"
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

        lowPrice: '',
        highPrice: '',

        pet: false,
        air: false,
        distance: false,

    };

    componentDidMount = () => {
        this.getDorms();

    }


    displayDorms = (dorms) => {
        // if (!posts.length) return null;
        console.log(dorms)
        // console.log(this.state.markers[0].position)
        const low = this.state.lowPrice;
        const high = this.state.highPrice;
        const pet = this.state.pet;
        const air = this.state.air;

        var map = ""

        // isPet
        let dorm = dorms;

        if(low && high){
            dorm = dorm.filter(dorm => (dorm.lowPrice >= low && dorm.lowPrice <= high) || (dorm.highPrice >= low && dorm.highPrice <= high));
        }
        if(pet){
            dorm = dorm.filter(dorm => (dorm.isPet == pet));
        }
        if(air){
            dorm = dorm.filter(dorm => (dorm.isAir == air));
        }
        
        if(dorm){
            dorm.sort((a,b) => a.lowPrice - b.lowPrice);
            if(this.state.distance){
                dorm.sort((a,b) => a.distance - b.distance);
            }
            return dorm.map( (post,index) => (
                
                <div>
                    
                    <br></br>
                    <div className="card" style={{ width: '18rem',height: 'auto'}}>
                        <div key={index} className="card-content" >
                            {/* <h2 > Dorm id: {post.id} </h2> */}
                                <div className="content" >
                                    <h3 className="card-header-title-center"> ชื่อหอ: {post.name } </h3>
                                    <p> ราคา/เดือน: {post.lowPrice} - {post.highPrice} </p>
                                    <p> โทร: {post.phone} </p>
                                    <p> ระยะทาง: {post.distance/1000} km.</p>
                                    <p> แผนที่: <a href={map = "https://www.google.com/maps/search/?api=1&query="+post.lat+"%2C"+post.lng} target="_blank">คลิ๊ก <GrMap/></a></p>
                                    {post.isPet 
                                       ? <p style={{color :'hsl(171, 100%, 29%)'}}> <MdPets/> สามารถเลี้ยงสัตว์ได้</p>
                                       
                                       : <p style={{color :'hsl(348, 100%, 61%)'}}> <MdPets/> ไม่สามารถเลี้ยงสัตว์ได้</p>
                                    }
                                    {post.isAir 
                                        ? <p style={{color :'hsl(171, 100%, 29%)'}}><FaRegSnowflake />  มีเครื่องปรับอากาศ</p>
                                        : <p style={{color :'hsl(348, 100%, 61%)'}}> <FaRegSnowflake />  ไม่มีเครื่องปรับอากาศ</p>
                                    }
                                    <br></br>
                                    <img src={post.imageUrl} alt="firebase-image" style={{ width: '80%' }}></img>
                                    
                                    <Link to={{ pathname: "/dorm/"+post.id }}>
                                        <button className="button is-link" style={{backgroundColor: "green"}}>ดูหอ</button>
                                    </Link> 
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

    onChange = e =>{
        const {name,value} = e.target
        this.setState({
            [name]: value
            
        });
        console.log(this.state)

    }

    // onTick = () =>{
    //     const air = this.state.air;
    //     this.setState({
    //         air: !air
    //     });

    // }

    onToggle = e =>{
        const {name} = e.target
        const prevCheck = this.state[name];
        this.setState({
            [name]: !prevCheck
        });

    }

    

render() {
    // const {message,currentUser} = this.state
    // console.log("state: "+this.state.air)

        return(

            <div>
                <div id="navbar">
                     <Navbar />
                </div>

                <div className="bg2">
                    <br/>
                    <div className="headline">
                        <center>
                            <h1 className="filterHeader" id="filter" style={{backgroundColor: 'white'}}>เว็บค้นหาและจองหอพัก </h1>
                        </center>
                    </div>
                    <div id="filter" className="filter">
                        <form className="filterText ">
                            <h1 id="filter" >ค้นหา </h1>
                            <label for="price" >ราคา : ตั้งแต่ </label>
                            <input type="text" id="lowPrice" name="lowPrice" onChange={this.onChange}></input> ถึง&nbsp;
                            <input type="text" id="highPrice" name="highPrice" onChange={this.onChange}></input> บาท

                            <br/> <p for="pet" > ประเภทหอพัก : </p>

                            <input type="checkbox" id="pet" name="pet" onChange={this.onToggle} ></input> อนุญาตให้เลี้ยงสัตว์ได้
                            <br></br>
                            <input type="checkbox" id="air" name="air" onChange={this.onToggle}></input> มีเครื่องปรับอากาศ
                            <br></br>
                            <input type="checkbox" id="distance" name="distance" onChange={this.onToggle}></input> เรียงตามระยะทาง

                        </form>

                        
                    </div>

                    {/* <center><div className="column is-half" style={{ width: '18rem' }}>
                        

                        <div className="blog-" >
                            {this.displayDorms(this.state.dorms)}
                        </div>
                    </div></center> */}
                </div>

                

                <div className="bg_card" >

                    <div className="wrapper ">
                        
                        {this.displayDorms(this.state.dorms)}
                    </div>
                    <br></br>
                    {/* <div className="bar"></div> */}


                </div>
                

            </div>

            
        )
    }

}
export default Home

