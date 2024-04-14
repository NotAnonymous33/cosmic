import "./css/Sim.css";
import { useEffect, useState } from "react";

export default function Sim(props) {
  // props i have access to
  // name="Earth"
  // speed={speed}
  // acceleration={0.1}
  // colour="blue"
  // className="sim"
  const [velocity, setVelocity] = useState(0);
  const [position, setPosition] = useState(0);

  const timeDiff = 50;
  const [cycleCounter, setCycleCounter] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVelocity((prevVelocity) =>
        position + 250 > window.innerHeight
          ? 0
          : prevVelocity + (props.acceleration * timeDiff) / 1000
      );
      setPosition((prevPosition) => {
        if (
          prevPosition + (velocity * timeDiff) / 1000 + 250 >
          window.innerHeight
        ) {
          setCycleCounter((prev) => prev + 0.5);
          setVelocity(0);
          setTimer(0);
          return 0;
        } else {
          return prevPosition + (velocity * timeDiff) / 1000;
        }
      });
    }, timeDiff);

    return () => clearInterval(interval);
  }, [velocity, position]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000); // increase timer every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sim">
      <h1>{props.name}</h1>
      <p>Timer: {timer} s</p>
      <p>Cycle Counter: {cycleCounter}</p>
      <p>Gravity: {props.acceleration}</p>
      <div
        className="planet"
        style={{
          position: "absolute",
          backgroundColor: props.colour,
          top: 200 + position + "px",
          width: "20px",
          height: "20px",
        }}
      ></div>
    </div>
  );
}
