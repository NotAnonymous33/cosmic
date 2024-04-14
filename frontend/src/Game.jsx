import React, { useState, useEffect, useRef } from "react";

function Game() {
  const stepSize = 5;
  const jumpHeight = 50;
  const jumpSize = 10;
  const circleSize = 100;
  const platformHeight = 50;
  const [x, setX] = useState((window.innerWidth - circleSize) / 2);
  const [y, setY] = useState(0);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [platformX, setPlatformX] = useState((window.innerWidth - 300) / 2); // 300 is platform width
  const [platformY, setPlatformY] = useState(window.innerHeight * 0.4); // 40% from bottom of window

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
          setY((prevY) => {
            const newY = Math.max(prevY - jumpSize, 0); // Set lower limit

            if (
              newY <= platformY + platformHeight &&
              x >= platformX &&
              x <= platformX + 300
            ) {
              // the circle is within the platform area
              // stop moving further down
              jumpLock.current = false;
              return platformY + platformHeight;
            }

            return newY; // No collision, continue falling
          });
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
      if (moveLeft) {
        setX((prevX) => Math.max(prevX - stepSize, 0)); // Normal left movement
      }
      if (moveRight) {
        setX((prevX) =>
          Math.min(prevX + stepSize, window.innerWidth - circleSize)
        ); // Normal right movement
      }

      // If the circle falls off platform
      if (
        y === platformY + platformHeight &&
        (x + circleSize < platformX || x > platformX + 300) &&
        !jumpLock.current
      ) {
        const fallDistance = platformY + platformHeight;
        const fallIterations = fallDistance / jumpSize;

        for (let i = 0; i < fallIterations; i++) {
          setTimeout(() => {
            setY((prevY) => {
              const newY = Math.max(prevY - jumpSize, 0); // Set lower limit
              return newY;
            });
          }, i * 20);
        }
      }
    }, 20);

    return () => {
      clearInterval(moveInterval);
    };
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

  const platformStyle = {
    width: "300px",
    height: `${platformHeight}px`,
    backgroundColor: "grey",
    position: "absolute",
    left: `${platformX}px`,
    bottom: `${platformY}px`,
  };

  return (
    <div>
      <div style={circleStyle}></div>
      <div style={platformStyle}></div>
    </div>
  );
}

export default Game;
