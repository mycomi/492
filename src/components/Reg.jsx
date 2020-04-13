import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
// import Post from '../../routes/PostRes'



class Reg extends React.Component {

    
render() {

        return(
            <section className="section container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <form action="/api/users"  method="post" > {/*action="http://localhost:3000/api/users"*/}
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
                                <label className="label" htmlFor="">Name</label>
                                <div className="control">
                                    <input className="input" type="text" name="name" onChange={this.onChange} required></input>
                                </div>
                            </div>
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

                                    <button className="button is-link">Submit</button>
                                    
  

                                    
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </section>
        )

    }
}
export default Reg