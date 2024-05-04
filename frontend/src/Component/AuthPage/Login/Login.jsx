import React, { useEffect, useState } from "react";
import { FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useToken from "../../useToken";
import { setUserName } from "../../MainCanvas/context/userNameReducer"; // Check the correct path
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
    const dispatch = useDispatch();
    const userName = useSelector(state => state.userName);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const { token, setToken } = useToken(); // Make sure useToken is correctly implemented

    useEffect(() => {
        console.log("the username : ", userName);
    }, [userName]);

    const handleUserName = async (email) => {
        try {
            const url = "http://localhost:4444/user/" + email;
            const response = await axios.get(url);
            const newName = response.data;
            dispatch(setUserName({ newName: newName }));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:4444/login", {
                email: formData.email,
                password: formData.password,
            });

            Swal.fire({
                title: "You logged in successfully",
                text: "You will be redirected to Main page ",
                icon: "success"
            });

            setToken(formData.email);
            localStorage.setItem('email', formData.email);
            await handleUserName(formData.email);
            navigate('/startproject');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email or password are incorrect",
                });
            }
        }

        setFormData({
            email: "",
            password: ""
        });
    };

    return (
        <>
            <div className="form-container sign-in">
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className=""><FaGooglePlusG/></i></a>
                        <a href="#" className="icon"><i className=""><FaFacebookF/></i></a>
                        <a href="#" className="icon"><i className=""><FaGithub/></i></a>
                        <a href="#" className="icon"><i className=""><FaLinkedinIn/></i></a>
                    </div>
                    <span>or use your email and password</span>
                    <input type="email" placeholder="Email" id="email" name="email" value={formData.email} onChange={handleInputChange} required/>
                    <input type="password" placeholder="Password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/>
                    <a href="#">Forgot Your Password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </>
    );
}
