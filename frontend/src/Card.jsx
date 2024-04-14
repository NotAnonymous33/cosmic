// import card css
import "./css/Card.css";
// import axios from "axios";
export default function Card(props) {
  console.log(props);
  return (
    <>
      <div className="card">
        <h1>Planet</h1>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <img src={props.src} className="card-image" alt="placeholder" />
        <button>Click me</button>
      </div>
    </>
  );
}
