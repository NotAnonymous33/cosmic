import "./css/Sim.css";
import {useEffect, useState} from "react";

export default function Sim(props) {
    // props i have access to
    // name="Earth"
    // speed={speed}
    // acceleration={0.1}
    // colour="blue"
    // className="sim"
    const [velocity, setVelocity] = useState(0)
    const [position, setPosition] = useState(0)

    const timeDiff = 50
    useEffect(() => {
        const interval = setInterval(() => {
            setVelocity((prevVelocity) => position + 250 > window.innerHeight ? 0 :
                prevVelocity + props.acceleration * timeDiff/1000)
            setPosition((prevPosition) => position + 250 > window.innerHeight ? 0 :
                prevPosition + velocity * timeDiff/1000)
        }, timeDiff);
        return () => clearInterval(interval)
    }, [velocity, props.acceleration])

    return (
        <div className="sim">
            <h1>{props.name}</h1>
            <p>Position: {Math.floor(position)}</p>
            <p>Velocity: {Math.floor(velocity)}</p>
            <p>Gravity: {props.acceleration}</p>
            <div className="planet" style={{
                position: "absolute",
                backgroundColor: props.colour,
                top: 200 + position + "px",
                width: "20px",
                height: "20px"
            }}></div>

        </div>
    )
}