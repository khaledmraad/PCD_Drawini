import React, {useState} from "react";
import { FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn, FaTable } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import useToken from "../../useToken";



export default function Login(){

    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData)
    };

    const navigate = useNavigate();

    const {token,setToken}=useToken()

    const handleSubmit = async (event) => {

        axios({
            method: "POST",
            url:"http://localhost:4444/login",
            data:{
                email: formData.email,
                password: formData.password,
            }
        })
            .then((response) => {
                Swal.fire({
                    title: "You logged in successfully",
                    text: "You will be redirected to Main page ",
                    icon: "success"
                });
                setToken(formData.email)
                localStorage.setItem('email', formData.email);
                navigate('/maincanvas');


            }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Email or password are incorrect",
                    });
                }
            }
        })

        setFormData(({
            email: "",
            password: ""}))



        event.preventDefault()

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
                    <input type="email" placeholder="Email"  id="email" name="email" value={formData.email} onChange={handleInputChange} required/>
                    <input type="password" placeholder="Password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/>
                    <a href="#">Forgot Your Password?</a>
                    <button>Sign In</button>
                </form>
            </div>
        </>
    );
}