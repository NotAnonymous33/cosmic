import Scene from "./Scene.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Profile from "./profile/profile.jsx";
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
        <ul
          className="nav-links"
          style={{
            position: "absolute",
            marginLeft: "750px",
          }}
        >
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Background />
              <Scene />
            </>
          }
        />
        <Route
          path="/cards"
          element={
            <>
              <Background />
              <Info />
            </>
          }
        />
        <Route path="/two" element={<Background />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/game"
          element={
            <>
              <Background />
              <Game />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
