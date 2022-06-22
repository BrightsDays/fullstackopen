import NumbersItem from './NumbersItem'

const NumbersList = ({ persons, filter, onClick }) => {
    const numbers = persons
        .filter(person => person.name.includes(filter))
        .map(person => {
            return <NumbersItem 
                key={`ps_${person.id}`} 
                person={person} 
                onClick={onClick}
            />
        })

    return (
        <div>
            {numbers.length ? numbers : 'nothing'}
        </div>
    )
}

export default NumbersList