import React from "react";
import './Signup.css';

function Signup (){
    return(
        <div className="page">
            <div className="cover">
              <h1>login</h1>
              <input type="text" placeholder="username" />
              <input type="password" placeholder="password" />

              <div className="login-btn">Login</div>

              <p className="loginusing">or  </p>

              <div className="alt-login">
                <div className="facebook-btn">Facebook</div>
                <div className="google-btn">Google</div>
              </div>
             </div>

        </div>
    );

}

export default Signup ;