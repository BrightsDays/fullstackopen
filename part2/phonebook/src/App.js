import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchFilter from './components/SearchFilter'
import NumbersList from './components/NumbersList'
import AddForm from './components/AddForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name: '',number: ''})
  const [filter, setFilter] = useState('')
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  })

  const handleChange = (event, type) => {
    setAlert(false)
    setNewPerson({...newPerson, [type]: event.target.value})
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newPerson.name && newPerson.number && !persons.filter(person => person.name === newPerson.name).length) {
      const nameObject = {
        name: newPerson.name,
        number: newPerson.number,
        id: persons.length + 1,
      }

      setPersons(persons.concat(nameObject))
      setNewPerson({name: '', number: ''})
    } else if (newPerson.name && newPerson.number) {
      setAlert(true)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter 
        filter={filter} 
        onChange={event => setFilter(event.target.value)} 
      />
      <h2>Add a new</h2>
      <AddForm 
        newName={newPerson.name}
        newNumber={newPerson.number}
        onChangeName={event => handleChange(event, 'name')}
        onChangeNumber={event => handleChange(event, 'number')}
        onSubmit={event => addPerson(event)}
        alert={alert}
      />
      <h2>Numbers</h2>
      <NumbersList 
        persons={persons} 
        filter={filter} 
      />
    </div>
  )
}

export default App