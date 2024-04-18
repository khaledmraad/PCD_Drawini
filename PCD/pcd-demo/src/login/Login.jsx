import React, { useState } from "react";
import './Login.css';

function Login () {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    return(
        <>
        <div className="page">
        <div className={" container " + (isSignUp ? ' active' : '')} id="container">

        <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
                <div className="form-container sign-up">
                    <form> 
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email and password</span>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <a href="#">Forgot Your Password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;
