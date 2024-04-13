// import card css
import './css/Card.css'
import Starfield from "react-starfield";
export default function Card(props) {
    return (
        <>
        <div className="card">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <img src={props.src} className="card-image" alt="placeholder" />
            <button>Click me</button>
        </div>
        </>
    )
}