export default function Lesson(props) {
    return (
        <>
            <h1>{props.lessons.name}</h1>
            <p>{props.lessons.description}</p>
            <p>Difficulty: {props.lessons.difficulty}</p>
            <img src={props.lessons.imageUrl} alt={props.lessons.name} />
            <p>{props.lessons.content}</p>
        </>
    )
}