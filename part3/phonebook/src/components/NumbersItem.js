const NumbersItem = ({ person, onClick }) => {
    return (
        <li>
            <span>{person.name}: {person.number}</span>
            <button onClick={() => onClick(person.id)}>delete</button>
        </li>
    )
}

export default NumbersItem