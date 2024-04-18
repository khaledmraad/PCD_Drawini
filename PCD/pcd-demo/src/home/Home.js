import React from 'react'
import "./Home.css"
import Footer from "./footer/Footer.js"
import Navbar from './navbar/Navbar.js'


const Home = () => {
    return (
        <>
            <Navbar />
            <div className="trapeze">
                <div class="glitch-wrapper">
                    <div class="glitch" data-glitch="FRAMEWARES">FRAMEWARES</div>
                 </div>

            </div>
            
           
            
            <Footer />
        </>
        	);
}

export default Home;