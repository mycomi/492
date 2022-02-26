import React from 'react'
import 'bulma/css/bulma.css'
import { Link,Redirect } from 'react-router-dom';
import Login_line from './Login_line'
// import Post from '../../routes/PostRes'
import Axios from 'axios';



class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name : '',
            email : '',
            password : '',
            phone: '',
            toDashboard: false
        }
    }
    

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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
        }
        Axios.post(`/auth/register/`,{ 
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
         })
        .then(res => {
            // console.log(res)
            console.log(res)
            console.log(res.data)
            
            
            alert("สมัครสมาชิกสำเร็จ")

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
            alert(e.response.data)
            console.log(user.email)
            console.log(user.password)
            alert('มีผู้ใช้นี้แล้ว')
        })

    }

    register =()=>{
        this.setState({register: true});
        this.setState({login: false});
    }

    login =()=>{
        this.setState({register: false});
        this.setState({login: true});
    }

    
render() {
    // const line_id = window.location.pathname.split('/');
    // console.log(line_id[3])

    if (this.state.toDashboard || this.state.login) {
        return <Login_line/>
    }

        return(
            <section className="section container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <form onSubmit={this.onSubmit} > {/*action="http://localhost:3000/api/users"*/}
                            {/* <div className="field">
                                <label className="label" htmlFor="">First Name</label>
                                <div className="control">
                                    <input className="input" type="first" name="first" onChange={this.onChange} ></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" htmlFor="">Last Name</label>
                                <div className="control">
                                    <input className="input" type="last" name="last" onChange={this.onChange} ></input>
                                </div>
                            </div> */}
                            <center><label className="label"> <h1> สมัครสมาชิก </h1></label></center>
                            <div className="field">
                                <label className="label" htmlFor="">ชื่อ</label>
                                <div className="control">
                                    <input className="input" type="text" name="name" onChange={this.onChange} required></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" htmlFor="">E-mail</label>
                                <div className="control">
                                    <input className="input" type="email" name="email" onChange={this.onChange} required></input>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="">รหัสผ่าน</label>
                                <div className="control">
                                    <input className="input" type="password" name="password" pattern=".{6,}" title="รหัสผ่านอย่างน้อย 6 ตัว" onChange={this.onChange} required></input>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="">เบอร์โทรติดต่อ</label>
                                <div className="control">
                                    <input className="input" type="tel" name="phone" onChange={this.onChange} pattern="[0]{1}[0-9]{9}" required></input>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">

                                    <button className="button is-link">ยืนยัน</button>

                                </div>
                            </div>
                            
                        </form>
                        <div>  &nbsp;  </div>
                        <button className="button is-warning" onClick={this.login}> ไปหน้าเข้าสู่ระบบ</button>
                        
                    </div>
                    
                </div>
            </section>
        )

    }
}
export default Register