import React from 'react'
import 'bulma/css/bulma.css'
// import firebase from '../firebase/firebase'
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import imges2 from '../f14.png';

import Profile_line from './Profile_line'
import Register_line from './Register_line'


class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email : '',
            password : '',
            // messages : [],
            // message : '',
            // currentUser : null,
            // image : '',
            // comment:''
        }
        // this.logout = this.logout.bind(this)
    }

    // state = {
    //     email: '',
    //     // password: ''
    // }

    

    onChange = e => {
        const {name,value} = e.target
        this.setState({
            [name]: value
            
        });
        console.log(this.state)
    }

    onSubmit = e => {
        e.preventDefault();
        const line_id = window.location.pathname.split('/');
        console.log(line_id[2])

        const user = {
            email: this.state.email,
            password: this.state.password,
            line_id: line_id[2],
        }

        // const {email,password} = this.state
        
        // firebase.auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then(response => {
        //         this.setState({
        //             currentUser: response.user                    
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             message: error.message
        //         })
        //     })
        Axios.post(`/auth/login_line`,{ 
            email: user.email,
            password: user.password,
            line_id: user.line_id,
         })
        .then(res => {
            // console.log(res)
            console.log(res)
            console.log(res.data)
            
            window.localStorage.setItem('token', res.data.acsessToken)
            window.localStorage.setItem('name', res.data.name)
            alert("เข้าสู่ระบบสำเร็จ")

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
            console.log(user.email)
            console.log(user.password)
            alert('E-mail หรือ รหัสผ่าน ไม่ถูกต้อง')
        })


    }

    register =()=>{
        this.setState({register: true});
        this.setState({login: false});
    }


render() {

    // const {message,currentUser} = this.state


    if(this.state.register){
        return (
            <Register_line/>
        )
    }
    
            if (localStorage.getItem('token')){
                return (
                    <Profile_line/>
                )
            }else{
                return(
                    <section className="section container">
                        <div className="columns is-centered">
                            <div className="column is-half">
                                <form onSubmit={this.onSubmit}>
                                {/* action="http://localhost:3000/api/users/login" method="post" */}
                                <center><label className="label"> <h1> เข้าสู่ระบบ </h1></label></center>
                                    <div className="field">
                                        <label className="label" htmlFor="">E-mail</label>
                                        <div className="control">
                                            <input className="input" type="email" name="email" onChange={this.onChange} required></input>
                                        </div>
                                    </div>
        
                                    <div className="field">
                                        <label className="label" htmlFor="">รหัสผ่าน</label>
                                        <div className="control">
                                            <input className="input" type="password" name="password" onChange={this.onChange} required></input>
                                        </div>
                                    </div>
        
                                    <div className="field is-grouped">
                                        <div className="control">
                                            
                                            <button className="button is-link">เข้าสู่ระบบ</button>
                                        </div>
                                    </div>

                                    
                                    
                                </form>
                                <div>  &nbsp;  </div>

                                <button className="button is-warning" onClick={this.register}> ไปหน้าเข้าสู่ระบบ</button>
                            </div>
                        </div>
                    </section>
                )
            }

        

    }
}
export default Login
