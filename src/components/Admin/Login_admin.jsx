import React from 'react'
import 'bulma/css/bulma.css'
// import firebase from '../firebase/firebase'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import imges2 from '../f14.png';


class Login_admin extends React.Component {

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
        const user = {
            email: this.state.email,
            password: this.state.password
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
        Axios.post(`/auth/admin/login`,{ 
            email: user.email,
            password: user.password
         })
        .then(res => {
            // console.log(res)
            console.log(res)
            console.log(res.data)
            
            window.localStorage.setItem('token-admin', res.data.acsessToken)
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
            console.log(user.email)
            console.log(user.password)
            alert('Invalid E-mail or password')
        })

        

        
    }

    // logout(){
    //     firebase.auth().signOut().then(response => {
    //         this.setState({
    //             currentUser : null
    //         })
    //     })
    // }


render() {

    // const {message,currentUser} = this.state
            if (localStorage.getItem('token-admin')){
                return (
                    <center>
                    <img src={imges2}/>
                
                        <div class="card" >
                            
                            <Link to="/admin">
                                <button className="button is-link">เข้าสู่เว็บไซต์</button>
                            </Link>
                        </div>
                    </center>
                )
            }else{
                return(
                    <section className="section container">
                        <div className="columns is-centered">
                            
                            <div className="column is-half">
                                <h1>admin</h1>
                                <form onSubmit={this.onSubmit}>
                                {/* action="http://localhost:3000/api/users/login" method="post" */}
                                    <div className="field">
                                        <label className="label" htmlFor="">Email</label>
                                        <div className="control">
                                            <input className="input" type="email" name="email" onChange={this.onChange} required></input>
                                        </div>
                                    </div>
        
                                    <div className="field">
                                        <label className="label" htmlFor="">Password</label>
                                        <div className="control">
                                            <input className="input" type="password" name="password" onChange={this.onChange} required></input>
                                        </div>
                                    </div>
        
                                    <div className="field is-grouped">
                                        <div className="control">
                                            
                                            <button className="button is-link">Login</button>
                                        </div>
                                    </div>

                                    <Link to ="/admin/register">
                                        <button className="button is-warning" > Register</button>
                                    </Link>
                                    
                                </form>
                            </div>
                        </div>
                    </section>
                )
            }

        

    }
}
export default Login_admin
