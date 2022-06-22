import NumbersItem from './NumbersItem'

const NumbersList = ({ persons, filter }) => {
    const numbers = persons
        .filter(person => person.name.includes(filter))
        .map(person => <NumbersItem key={`ps_${person.id}`} person={person} />)

    return (
        <div>
            {numbers.length ? numbers : 'nothing'}
        </div>
    )
}

export default NumbersList