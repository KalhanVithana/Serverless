import React from 'react'
import NavBar from '../components/headers/nav'
import '../assets/home.css'
import img from '../assets/images/webpurp.png'
export default function Home() {
    return (
        <div className="container-fluid">
            <NavBar/>

           <div className="main">
                <div className="left">

                    <p>User management</p>
                </div>

                <div className="right">
                    <div className="image-1">
                        <img src={img} style={{width:"48rem",marginTop:"6rem"}}/>
                        
                    </div>
                    </div>

           </div>
        </div>
    )
}
