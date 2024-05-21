import React from 'react'
import "./Home.css"
import Footer from "./footer/Footer.js"
import Navbar from './navbar/Navbar.js'
import { useEffect, useState , useRef  } from "react";
import {  useNavigate } from "react-router-dom"


const Home = () => {

    const navigate = useNavigate();
	const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();
  const [carouselDom, setCarouselDom] = useState(null);
  const [SliderDom, setSliderDom] = useState(null);
  const [thumbnailBorderDom, setThumbnailBorderDom] = useState(null);
  const [thumbnailItemsDom, setThumbnailItemsDom] = useState([]);
  const [timeDom, setTimeDom] = useState(null);
  const [suivantDom, setSuivantDom] = useState(null);
  const [precedentDom, setPrecedentDom] = useState(null);

  // rendering previews
  useEffect(() => {
    if (!files) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);

    // free memory
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]);

  

// slder
useEffect(() => {
let suivantDom = document.getElementById('suivant');
let precedentDom = document.getElementById('precedent');

let carouselDom = document.querySelector('.carousel-slider');
let SliderDom = carouselDom.querySelector('.list-slider');
let thumbnailBorderDom = document.querySelector('.thumbnail-slider');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item-slider');
let timeDom = document.querySelector('.time-slider');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoSuivant = 30000;

suivantDom.onclick = function(){
    showSlider('suivant');    
}

precedentDom.onclick = function(){
    showSlider('precedent');    
}

let runTimeOut;
let runSuivantAuto = setTimeout(() => {
  suivantDom.click();
}, timeAutoSuivant);

function showSlider(type){
    let thumbnailItemsDom = document.querySelectorAll('.thumbnail-slider .item-slider');

    if(type === 'suivant'){
        SliderDom.appendChild(SliderDom.children[0]);
        thumbnailBorderDom.appendChild(thumbnailBorderDom.children[0]);
        carouselDom.classList.add('suivant');
    } else {
        SliderDom.insertBefore(SliderDom.children[SliderDom.children.length - 1], SliderDom.firstChild);
        thumbnailBorderDom.insertBefore(thumbnailBorderDom.children[thumbnailBorderDom.children.length - 1], thumbnailBorderDom.firstChild);
        carouselDom.classList.add('precedent');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('suivant');
        carouselDom.classList.remove('precedent');
    }, timeRunning);

    clearTimeout(runSuivantAuto);
    runSuivantAuto = setTimeout(() => {
        suivantDom.click();
    }, timeAutoSuivant);
}
}, []);

    return (
        <>
            <Navbar />
            <div className="trapeze">
                <div className="glitch-wrapper">
                    <div className="glitch" data-glitch="FRAMEWARES">FRAMEWARES</div>
                 </div>
                 </div>
                 <div className="box-start">
                 <div class="start_box">
                    <i class="fa-solid fa-circle-question"></i>
                     <div class="question">Do you wanna start ?</div>
                         <div class="btn-start_box">
                            <button class="Canvas-btn" onClick={()=>navigate("/maincanvas")}>Canvas</button>
                             <button class="Project-btn"onClick={()=>navigate("/startproject")}>New Project</button>
                    </div>
                </div>
                </div>
      {/* {previews &&
        previews.map((pic) => {
          return <img src={pic} />;
        })} */}

{/* slider */}

    <div className="carousel-slider">
      
        <div className="list-slider">
            <div className="item-slider">
                <img src="/assets/1.png"/>
                <div className="content-slider">
                    <div className="author-slider">PCD</div>
                    <div className="title-slider">WEB</div>
                    <div className="topic-slider">WAREFRAME</div>
                    <div className="des-slider">
                       
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                    </div>
                    <div className="buttons-slider">
                        <button>SEE MORE</button>
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
            </div>
            <div className="item-slider">
                <img src="/assets/2.png"/>
                <div className="content-slider">
				<div className="author-slider">PCD</div>
                    <div className="title-slider">WEB</div>
                    <div className="topic-slider">WAREFRAME</div>
                    <div className="des-slider">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                    </div>
                    <div className="buttons-slider">
                        <button>SEE MORE</button>
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
            </div>
            <div className="item-slider">
                <img src="/assets/3.png"/>
                <div className="content-slider">
				<div className="author-slider">PCD</div>
                    <div className="title-slider">WEB</div>
                    <div className="topic-slider">WAREFRAME</div>
                    <div className="des-slider">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                    </div>
                    <div class="buttons-slider">
                        <button>SEE MORE</button>
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="thumbnail-slider">
            <div className="item-slider">
                <img src="/assets/1.png"/>
                <div className="content-slider">
                    <div className="title-slider">
                        Name Slider
                    </div>
                    <div className="description-slider">
                        Description
                    </div>
                </div>
            </div>
            <div className="item-slider">
                <img src="/assets/2.png"/>
                <div className="content-slider">
                    <div className="title-slider">
                        Name Slider
                    </div>
                    <div className="description-slider">
                        Description
                    </div>
                </div>
            </div>
            <div className="item-slider">
                <img src="/assets/3.png"/>
                <div className="content-slider">
                    <div className="title-slider">
                        Name Slider
                    </div>
                    <div className="description-slider">
                        Description
                    </div>
                </div>
            </div>
            
        </div>

        <div className="arrows-slider">
            <button id="precedent"> {"<"} </button>
            <button id="suivant"> {">"} </button>
        </div>
        <div className="time-slider"></div>
    </div>

{/* fin slider */}



        <div className="section-about">
			<div className="container-about">
				<div className="content-section-about">
					<div className="title-about">
						<h1>About Us</h1>
					</div>
					<div className="content-about">
						<h3>Lorem ipsum dolor sit amet, consectetur adipisicing</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.</p>
						<div className="button">
							<a href="">Read More</a>
						</div>
					</div>
					</div>
				<div className="image-section-about">
					<img src="/assets/1.png"/>
				</div>
				
			</div>
			
		</div>
            
           
            
            <Footer />
        </>
        	);
}

export default Home;