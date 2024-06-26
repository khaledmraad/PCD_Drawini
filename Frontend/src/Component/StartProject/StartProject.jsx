import {useState, createRef, React} from "react";
import CanvasAddButton from "../MainCanvas/component/CanvasAddButton";
import CanvasSizeCard from "./CanvasSizeCard";
import {Dialog} from "@mui/material";
import { ExternalDropZone, Upload } from "@progress/kendo-react-upload";
import {useSelector} from "react-redux";
import {FaDownload, FaRegTrashAlt} from "react-icons/fa";




export default function StartProject(){

    //const uploadRef = React.createRef();

    const userName=useSelector(state=>state.userName);
  
    const [image, setImage] = useState(null);
    const [technology, setTechnology] = useState('html');
    const [response, setResponse] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleTechnologyChange = (e) => {
        setTechnology(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!image) {
            alert('Please select an image');
            return;
        }
    
        const formData = new FormData();
        formData.append('img', image);
        formData.append('technology', technology);
    
        try {
            const response = await fetch('http://localhost:5001/api/generate', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
    
                if (contentType && contentType.startsWith('application/json')) {
                    // Handle JSON response
                    const data = await response.json();
                    alert(data.message || 'Download successful');
                } else {
                    // Handle ZIP file or other binary data
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `${technology}_app.zip`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
            } else {
                // Handle error response
                const text = await response.text();
                alert(text);  // Display the error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error');  // Display a generic network error message
        }
    };
    const handleChange = async (e) => {
        e.preventDefault();
    
        if (!image) {
            alert('Please select an image');
            return;
        }
    
        const formData = new FormData();
        formData.append('img', image);
        formData.append('technology', technology);
    
        try {
            const response = await fetch('http://localhost:5001/api/change', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Display the JSON data in the console
                alert(JSON.stringify(data, null, 2)); // Alert the JSON data in a formatted string
            } else {
                // Handle error response
                const text = await response.text();
                alert(text);  // Display the error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error');  // Display a generic network error message
        }
    };
    
    
    return (
        <>
            <nav
                className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex space-between">
                        <div className="flex items-center justify-start rtl:justify-end">


                            <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3"
                                     alt="FlowBite Logo"/>
                                <span
                                    className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">HandDrawn Interface Coder</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div>
                                    <button type="button"
                                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                            aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <h1 className="text-[#ffffff] font-bold mt-1 mx-2 text-xl">{userName.userName[0]} </h1>
                                        <img className="w-8 h-8 rounded-full"
                                             src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                             alt="user photo"/>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                   aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <form>
                        <label htmlFor="search"
                               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative mb-5">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="search"
                                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search" required/>
                            <button type="submit"
                                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                            </button>
                        </div>
                    </form>
                    <ul className="space-y-2 font-medium">
                        <li className="flex items-inline">
                            <a href="#" title="Edit Project"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 22 21">
                                    <path
                                        d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path
                                        d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span className="ms-3">Project 1</span>




                            </a>
                            <button className="rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group px-4"  title="Delete Project"><FaRegTrashAlt style={{ color: 'white'}}/></button>
                            <button className="rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group px-4" title="Download Project Code" onClick={handleSubmit}><FaDownload  style={{ color: 'white'}}/></button>

                        </li>

                        <li className="flex items-inline">
                            <a href="#" title="Edit Project"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 22 21">
                                    <path
                                        d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path
                                        d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span className="ms-3">Project 2</span>
                            </a>

                            <button
                                className="rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group px-4" title="Delete Project">
                                <FaRegTrashAlt style={{color: 'white'}}/></button>
                            <button
                                className="rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group px-4"  title="Download Project Code">
                                <FaDownload style={{color: 'white'}}/></button>

                        </li>

                    </ul>
                </div>
            </aside>


            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14">

                    <h1 className="text-[#000000] text-xl font-bold">Import From Images : </h1>

                    <div class="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center w-full mt-4">
                            {/* Barre de sélection pour la technologie */}

                        </div>
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file"
                                   class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                        class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                        800x400px)</p>
                                </div>
                                <input //onChange={() => console.log("jdchqjsdjkhcb")} 
                                        id="dropzone-file" type="file" accept="image/*"
                                       class="hidden" onChange={handleImageChange}/>
                            </label>
                            
                            
                        </div><br></br>
                        <div class="mb-4 flex items-center justify-center">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded"
                                onClick={handleChange}>
                                Modify
                            </button>
                            <select
                                className="border border-gray-300 rounded-lg p-2 mx-2"
                                value={technology}
                                onChange={handleTechnologyChange}
                            >
                                <option value="html">HTML/CSS</option>
                                <option value="react_js">React JavaScript</option>
                                <option value="react_ts">React TypeScript</option>
                                <option value="angular">Angular</option>
                            </select>

                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded"
                                onClick={handleSubmit}>
                                Download
                            </button>
                        </div>
                    </form>
                    </div>
                </div>


                <div className="flex p-4 rounded-lg dark:border-gray-700 mt-14">
                    <h1 className="text-[#000000] text-xl font-bold">Create Manually : </h1>
                    <br/>
                    <CanvasSizeCard class="m-5" content="1920 x 1080" description="Laptop Screen"></CanvasSizeCard>
                    <CanvasSizeCard class="m-5" content="1920 x 1080" description="Tablet Screen"></CanvasSizeCard>
                    <CanvasSizeCard class="m-5" content="1920 x 1080" description="IPhone Screen"></CanvasSizeCard>

                </div>
            </div>
        </>
    );
}