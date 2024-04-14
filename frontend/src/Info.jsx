import cards from "./cardinfo.json";
import Card from "./Card.jsx";

export default function Info() {
  const elements = cards.map((card) => (
    <Card
      name={card.name}
      description={card.description}
      src={card.src}
      key={card.name}
    />
  ));

  return <div className="cards-container">{elements}</div>;
}
