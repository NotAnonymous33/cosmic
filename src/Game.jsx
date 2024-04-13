import React, { useState, useEffect, useRef } from "react";

function Game() {
  const stepSize = 5;
  const jumpHeight = 50;
  const jumpSize = 10;
  const circleSize = 100;
  const [x, setX] = useState((window.innerWidth - circleSize) / 2);
  const [y, setY] = useState(0);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const jumpLock = useRef(false);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      setMoveLeft(true);
    }
    if (event.key === "ArrowRight") {
      setMoveRight(true);
    }
    if (event.key === "ArrowUp" && !jumpLock.current) {
      jumpLock.current = true;

      // Move circle up
      for (let i = 0; i < jumpHeight; i++) {
        setTimeout(() => {
          setY((y) => Math.min(y + jumpSize, window.innerHeight - circleSize)); // Set upper limit
        }, i * 20);
      }
      // Bring circle down
      for (let i = 0; i < jumpHeight; i++) {
        setTimeout(() => {
          setY((y) => Math.max(y - jumpSize, 0)); // Set lower limit
        }, (i + jumpHeight) * 20);
      }
      // Reset jumping lock
      setTimeout(() => {
        jumpLock.current = false;
      }, 2 * jumpHeight * 20);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft") {
      setMoveLeft(false);
    }
    if (event.key === "ArrowRight") {
      setMoveRight(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (moveLeft) setX((x) => Math.max(x - stepSize, 0)); // Set left limit
      if (moveRight)
        setX((x) => Math.min(x + stepSize, window.innerWidth - circleSize)); // Set right limit
    }, 20);

    return () => clearInterval(moveInterval);
  }, [moveLeft, moveRight]);

  const circleStyle = {
    width: `${circleSize}px`,
    height: `${circleSize}px`,
    borderRadius: "50%",
    position: "absolute",
    left: `${x}px`,
    bottom: `${y}px`,
    backgroundColor: "blue",
    transition: "left 0.05s linear, bottom 0.01s linear",
  };

  return (
    <div>
      <div style={circleStyle}></div>
    </div>
  );
}

export default Game;
