import "./css/Card.css";
import Starfield from "react-starfield";
import { useHistory } from "react-router-dom";

export default function Card(props) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/lessons/${props.name}`);
  };

  return (
    <>
      <div className="card">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <img src={props.src} className="card-image" alt="placeholder" />
        <button onClick={handleClick}>Click me</button>
      </div>
    </>
  );
}
