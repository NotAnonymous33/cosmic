import React, { useEffect } from 'react';
import './css/Background.css';

const Background = () => {

    useEffect(() => {
        let container = document.querySelector("#container");

        const updateStars = (e) => {
            let x = e.clientX / window.innerWidth - 0.5;
            let y = e.clientY / window.innerHeight - 0.5;
            let layers = document.querySelectorAll(".layer");

            for (let i = 0; i < layers.length; i++) {
                layers[i].style.transform = `translate(${-x * (i + 1) * 200}px, ${-y * (i + 1) * 200}px)`;
            }
        };

        container.addEventListener("mousemove", updateStars);

        // Clean up event listeners on unmount
        return () => {
            container.removeEventListener("mousemove", updateStars);
        };

    }, []);

    return (
        <div id="container">
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
        </div>
    )
};

export default Background;