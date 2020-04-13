import React from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import Axios from 'axios';
import './style.css';
import d from './d.png';
import t from './t.png';
import j from './j.png';



class About extends React.Component {

    
        
    
        render() {
            
                return(
                    <div>
                        
                    
                        <center>
                        <Link to ="/">
                            <button className="button is-link">Home</button>
                            </Link>
                           <h1>
                               ผู้จัดทำ
                           </h1>

                           <p>
                               นาย รชต จ๊ะราจา 610610607
                               
                           </p>
                           
                           <img src={d} />


                           

                           <p>
                             นาย ชัยวัฒน์ สถิรวัฒนา  610612014
                               
                           </p>
                           
                           <img src={t} />


                           

                           <p>
                               นาย ศุภชัย มาวงค์ 610610618
                               
                           </p>
                           
                           <img src={j} />

                           
                           
                            </center>
                    </div>
                )
        }
    }
           
export default About