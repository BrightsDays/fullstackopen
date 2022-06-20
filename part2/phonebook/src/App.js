import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [alert, setAlert] = useState(false)

  const handleNameChange = (event) => {
    setAlert(false)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setAlert(false)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName && newNumber && !persons.filter(person => person.name === newName).length) {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else if (newName && newNumber) {
      setAlert(true)
    }
  }

  const numbers = persons
    .filter(person => person.name.includes(filter))
    .map(person => <li key={`nm_${person.id}`}>{person.name}: {person.number}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter: 
          <input 
            value={filter} 
            onChange={event => setFilter(event.target.value)} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={event => addPerson(event)}>
        <div>
          <div>name: 
            <input 
              value={newName}
              onChange={event => handleNameChange(event)} />
          </div>
          <div>number: 
            <input 
              value={newNumber} 
              onChange={event => handleNumberChange(event)} />
          </div>
          {alert && <p>{newName} already added in phonebook</p>}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {numbers.length ? numbers : 'nothing'}
      </div>
    </div>
  )
}

export default App