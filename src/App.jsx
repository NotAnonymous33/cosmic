import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Navbar from "./Navbar.jsx";
import Scene from "./Scene.jsx";

function App() {

    const planetRef = useRef([]);

    return <>
        <Navbar />
        <Scene />
        </>;
}




export default App;

// const planetColors = [0x1a1a1a, 0xe6e6e6, 0x2f6a69, 0x993d00, 0xb07f35, 0xb08f36, 0x5580aa, 0x366896];

