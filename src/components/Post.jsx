import React from 'react'
import 'bulma/css/bulma.css'
import { Link,Redirect } from 'react-router-dom';
// import Post from '../../routes/PostRes'
import Axios from 'axios';
import Navbar from './Navbar'





class Reg extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            Aname : '',
            price : '',
            address : '',
            info : '',
            tel : '',
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
        const token = localStorage.getItem('token')
        const user = {
            Aname: this.state.Aname,
            price: this.state.price,
            address: this.state.address,
            info: this.state.info,
            tel: this.state.tel,
            
        }
        Axios.post(`/api/items`,{ 
            
            Aname: user.Aname,
            price: user.price,
            address: user.address,
            info: user.info,
            tel: user.tel,
            token: token   
              
            
         })
        .then(res => {
            // console.log(res)
            console.log(res)
            console.log(res.data)
            window.location.reload(false);
            alert("post success")
          
            
        })
        .catch(e => {
            console.log(e)
            console.log(user)
            alert("post fail")
        })

        

        
    }

render() {

    if (localStorage.getItem('token')){
        

        return(
            <div>
 <Navbar />
            
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
                            <div className="field">
                                <label className="label" htmlFor="">ชื่อหอ</label>
                                <div className="control">
                                    <input className="input" type="text" name="Aname" onChange={this.onChange} required></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" htmlFor="">ราคา/เดือน</label>
                                <div className="control">
                                    <input className="input" type="number" name="price" onChange={this.onChange} required></input>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="">ตำแหน่งที่ตั้ง</label>
                                <div className="control">
                                    <textarea className="textarea" name="address"  cols="30" rows="10" onChange={this.onChange} required></textarea>
                                    
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="">รายละเอียด</label>
                                <div className="control">
                                    <textarea className="textarea" name="info"  cols="30" rows="10" onChange={this.onChange}></textarea>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="">เบอร์โทรติดต่อ</label>
                                <div className="control">
                                    <input className="input" type="text" name="tel" onChange={this.onChange} pattern="^0([8|9|6])([0-9]{8}$)" autocomplete="off"
 required></input>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">

                                    <button  className="button is-link">Submit</button>
                                    
  

                                    
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </section>
            </div>
        )
    }else{
        return (
            Redirect('/')
        )
        
    }

    }
}
export default Reg