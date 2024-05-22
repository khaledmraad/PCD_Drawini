import React, {useEffect, useState} from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

import "./AuthPage.css";
import useToken from "../useToken";
import {useNavigate} from "react-router-dom";

export default function AuthPage(props) {

    const { token } = useToken();

    const navigate = useNavigate();


    useEffect(() => {
        if(token) navigate("/maincanvas")
    }, []);

    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    return (
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

            <Login/>

            <SignUp/>




        </div>
    </div>)
}