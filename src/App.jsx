import Scene from "./Scene.jsx";
import Login from "./Login.jsx";
import Info from "./Info.jsx";

import { NavLink, Route, Routes } from "react-router-dom";
import Temp from "./Temp.jsx";
import Background from "./Background.jsx";
import Game from "./Game.jsx";

function App() {
  return (
    <>
      <nav className="navbar">
        <h1>website name</h1>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cards">Cards</NavLink>
          </li>
          <li>
            <NavLink to="/two">Two</NavLink>
          </li>
          <li>
            <NavLink to="/game">Game</NavLink>
          </li>
        </ul>
        <NavLink to="/login">Login</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Scene />} />
        <Route path="/cards" element={<Info />} />
        <Route path="/two" element={<Background />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
