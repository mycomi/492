import React from 'react'
import 'bulma/css/bulma.css'
import { Link,useParams,Redirect } from 'react-router-dom';
import Navbar from './Navbar_admin'
import Axios from 'axios';

import '../style.css';

import firebase from '../firebase/firebase';

import { FaAndroid } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { TiHome } from "react-icons/ti";
// import firebase from '../firebase/firebase'
import { app } from 'firebase';

import { TiUser } from "react-icons/ti";
// import firebase from '../firebase/firebase'


// import Navbar from './Navbar'
// import MessageList from './MessageList'
class AddPhoto_admin extends React.Component {
    
    state = {
        image: [],
        imageUrl: '',
        showUploadButton: false,
        progress: 0,
        photos: [],

    };

    componentDidMount = () => {
        this.getPhotos();
        

    }

    getPhotos = () => {
        const token = localStorage.getItem('token-admin')
        
        if(token){
            Axios.get(`/auth/admin/get_photo`,{ 
                headers: {
                    "access-token": token
                }
            })
           .then(res => {
               console.log(res.data)
               const data = res.data
               this.setState({ photos: data});
    
           })
           .catch(e => {
            //    alert('help')
            console.log(e)
           })

        }
    }

    displayPhotos = (photos) => {
        console.log(photos)
        if(photos){
            return photos.map( (photo,index) => (
                <div>
                    <br></br>
                    <div className="card" style={{ width: '40rem',height: '40rem',justifyContent: 'center', alignItems: 'center'}}>
                        <div key={photo.id} className="card-content">
                            <div className="content" >
                                <img src={photo.imageUrl} style={{ width: '80%' }}></img>
                                
                            </div>
                            <footer className="card-footer" style={{justifyContent: 'center'}}>
                                
                                <button className="button is-danger" onClick={() => this.delete(photo.id)} > ลบรูปภาพนี้ </button>
  
                            </footer>
                        </div>
                    </div>
                    
                </div>
    
                
            ))

        }
        
    }

    delete(id){
        // preventDefault();
        console.log(id)
        const token = localStorage.getItem('token-admin')
        const data = {
            id: id,
        }
        const header = {
            headers: {
                "access-token": token
            },
        }
        Axios.post(`/auth/admin/delete_photo`,data,header)
        .then(res => {
           console.log(res.data)
           const data = res.data

           alert("ลบรูปสำเร็จ")

           window.location.reload(false); 

       })
       .catch(e => {

        console.log(e)
       })
    }

    uploadPhoto = () => {
        let file = this.state.image;
        let token = localStorage.getItem('token-admin')
        let date = Date.now();
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child('images/'+token+ "/"+date+"_"+file.name).put(file);
        const header = {
            headers: {
                "access-token": token
            },
        }

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>{
            var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
            this.setState({progress})
            },(error) =>{
            throw error
            },() =>{
            // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

            uploadTask.snapshot.ref.getDownloadURL().then(async(url) =>{
                await Axios.post(`/auth/admin/add_photo/`,{
                    imageUrl: url,
                },header)
                
                .then(res => {
                    
                    // console.log(res)
                    console.log(res)
                    console.log(res.data)
                    
                    alert("success")
                    window.location.reload(false);
                    
                })
                // .then(() => this.setState(() => ({
                //     toDashboard: true
                //   })))
                .catch(e => {
                    console.log(e)

                    // alert('มีผู้ใช้นี้แล้ว')
                })
                console.log(url)
                // alert("upload success")
            })
            // document.getElementById("file").value = null

        }) 
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
    const photos = this.state.photos;
    const token = localStorage.getItem('token-admin')
    if(token){
        return(
            <div>
                <div id="navbar">
                     <Navbar />
                </div>

                {/* <div class="bg2">
                    <center><div className="column is-half">
                        <div className="blog-" >
                            {(this.state.rooms).length > 0 
                                ? <div>{this.displayRooms(this.state.rooms)}</div>
                                : <h1>ไม่มีห้องว่าง</h1>
                            
                            }

                        </div>
                    </div></center>
                </div> */}
                <div className="bg2" style={{height:'700px'}}>
                    <br></br>
                        
                        <center>
                            <div className="container3">
                                <br></br>
                                <h1> รูปภาพเพิ่มเติม </h1>
                                <br></br>
                                <p> คลิ๊กที่ปุ่ม Choose File เพื่อเพิ่มรูปภาพของหอพัก สูงสุด 5 รูป</p>

                                <div>
                                <br></br>
                                <p > อัพโหลดรูปภาพ </p>

                                {(photos.length < 5) && 
                                    <input type="file" onChange={this.onHandleChange} ></input>
                                }

                                <br></br>
                                <br></br>
                                {this.state.showUploadButton &&
                                    <progress className="progress is-small is-success" style={{width: '18rem'}} value={this.state.progress} max="100"></progress>
                                }
                                <br></br>
                                {this.state.showUploadButton &&
                                    <button type="button" onClick={this.uploadPhoto} >ยืนยัน </button>
                                }
                                </div>
                            </div>
                            
                            <div className="wrapper2 " >
                                
                                {this.displayPhotos(this.state.photos)}
                            </div>
                        </center>
                        
                        <br></br>
                        {/* <div className="bar"></div> */}


                    </div>
                
            </div>
        )
    }else{
        return (
            <Redirect to='/admin/' />

        )
    }
        
    } 
    

}
export default AddPhoto_admin