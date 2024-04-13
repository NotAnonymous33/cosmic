import cards from "./cardinfo.json";

export default function Info() {

    const elements = cards.map(card =>
            <div className="card" key={card.name}>
                <h2>{card.name}</h2>
                <p>{card.description}</p>
                <img src={card.src} alt="placeholder" className="card-image"/>
                <button>Click me</button>
            </div>
    )



    return <div className="cardsContainer">{elements}</div>;
}