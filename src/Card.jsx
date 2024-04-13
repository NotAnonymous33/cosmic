
export default function Card(props) {
    return (
        <div className="card">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <img src="https://via.placeholder.com/150" alt="placeholder" />
            <button>Click me</button>
        </div>
    )
}