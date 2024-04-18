import React, {useState} from "react";
import { FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn, FaTable } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";


export default function SignUp(){

    const [loginForm, setloginForm] = useState({
        userName:"",
        email: "",
        password: ""
    })

    const navigate=useNavigate();

    const [confirmPass,setConfirmPassword]=useState("")

    function btnSignUp(event) {
        if (loginForm.password!==confirmPass){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password dont match the confirm password",
            });

        }

        else {
            axios({
                method: "POST",
                url: "http://localhost:4444/signup",
                data: {
                    email: loginForm.email,
                    password: loginForm.password,
                    username: loginForm.userName
                }
            })
                .then((response) => {
                    Swal.fire({
                        title: "You signed up successfully",
                        text: "You will be redirected to login ",
                        icon: "success"
                    });

                    localStorage.setItem('email', loginForm.email)

                    navigate('/maincanvas');



                }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 409) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Email already exist",
                        });
                    }
                }
            })

            setloginForm(({
                userName: "",
                email: "",
                password: ""
            }))


            setConfirmPassword("")
        }

        event.preventDefault()
    }

    function handleChange(event) {
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}


    return (
        <div className="form-container sign-up">
            <form onSubmit={btnSignUp}>
                <h1>Create Account</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className=""><FaGooglePlusG/></i></a>
                    <a href="#" className="icon"><i className=""><FaFacebookF/></i></a>
                    <a href="#" className="icon"><i className=""><FaGithub/></i></a>
                    <a href="#" className="icon"><i className=""><FaLinkedinIn/></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Username" name="userName" value={loginForm.userName}
                       onChange={handleChange} required/>
                <input type="email" placeholder="Email" name="email" value={loginForm.email} onChange={handleChange}
                       required/>
                <input type="password" placeholder="Password" name="password" value={loginForm.password}
                       onChange={handleChange} required/>
                <input type="password" placeholder="Confirm Password" value={confirmPass}
                       onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                <button>Sign Up</button>
            </form>
        </div>
    )
}