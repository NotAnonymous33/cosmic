import React from "react";
import planetsinfo from "./planetsinfo";
import Sim from "./Sim";
import "./css/Game.css";

export default function Game() {
  const elems = planetsinfo.map((planet) => {
    return (
      <Sim
        name={planet.name}
        key={planet.name}
        acceleration={planet.gravity}
        colour={planet.color}
        texturePath={planet.texturePath} // Pass texturePath as prop
        className="sim"
      />
    );
  });
  return <div className="sims-container">{elems}</div>;
}
