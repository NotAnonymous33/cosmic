import React, { useEffect } from 'react';
import './css/Background.css';
import Starfield from "react-starfield";

const Background = () => {

    return (<Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
    />)
};

export default Background;