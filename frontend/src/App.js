import './App.css';
import AuthPage from "./Component/AuthPage/AuthPage";
import Home from "./Component/Home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import useToken from "./Component/useToken";
import UserCanvas from "./Component/MainCanvas/UserCanvas";
import StartProject from "./Component/StartProject/StartProject";

function App() {

    const { token, removeToken, setToken } = useToken();


    return (
    <>

        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/signup" element={<AuthPage setToken={setToken}/>}/>
                <Route exact path="/maincanvas" element={<UserCanvas token={token}/>}></Route>
                <Route exact path="/startproject" element={<StartProject token={token}/>}></Route>

            </Routes>

        </BrowserRouter>

    </>
  );
}

export default App;
