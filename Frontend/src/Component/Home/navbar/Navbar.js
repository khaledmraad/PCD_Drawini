import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import useToken from "../../useToken";

function Navbar() {
	const navRef = useRef();

	const {token ,setToken}=useToken()

	const navigate=useNavigate()

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	function logout(){
		localStorage.removeItem('email')
		setToken("");
		navigate("/")
	}

	function canvas(){
		navigate("/maincanvas")

	}


	return (
		<header>
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<a href="/#">Home</a>
				<a href="/#">My work</a>
				<a href="/#">Blog</a>
				<a href="/#">About me</a>
				<a href="/maincanvas">Canvas</a>
				<a href="/startproject">Start Project</a>
				{token ?
					<>
						<a href="/" onClick={logout}>Logout</a>
					</>
					: <a href="/signup">SignUp</a>}


				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes/>
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;