import React from 'react'
import 'bulma/css/bulma.css'
import { Link,Redirect } from 'react-router-dom';
// import Post from '../../routes/PostRes'
import Axios from 'axios';



class Register_admin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name : '',
            email : '',
            password : '',
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

    
render() {
    if (this.state.toDashboard === true) {
        return <Redirect to='/admin/login' />
      }

        return(
            <section className="section container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <center><h1>ผู้ดูแลหอพัก</h1></center>
                        <br></br>
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
                                    <input className="input" type="password" name="password" onChange={this.onChange} required></input>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">

                                    <button className="button is-link">ยืนยัน</button>

                                </div>
                            </div>
                            <Link to ="/admin/login">
                                <button className="button is-success">ไปหน้าเข้าสู่ระบบ</button>
                            </Link> 
                        </form>
                        
                    </div>
                    
                </div>
            </section>
        )

    }
}
export default Register_admin