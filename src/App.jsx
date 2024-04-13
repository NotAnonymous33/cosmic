import Scene from "./Scene.jsx";
import Login from "./Login.jsx";
import Info from "./Info.jsx";

import {NavLink, Route, Routes, useLocation} from "react-router-dom";
import Temp from "./Temp.jsx";

function App() {

    return (
        <>
            <nav className="navbar">
                <h1>website name</h1>
                <ul className="nav-links">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/cards">Cards</NavLink></li>
                    <li><NavLink to="/two">Two</NavLink></li>
                </ul>
                <NavLink to="/login">Login</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Scene />} />
                <Route path="/cards" element={<Info />} />
                <Route path="/two" element={<Scene />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}


export default App;

// const planetColors = [0x1a1a1a, 0xe6e6e6, 0x2f6a69, 0x993d00, 0xb07f35, 0xb08f36, 0x5580aa, 0x366896];

