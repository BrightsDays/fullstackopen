import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import NumbersList from './components/NumbersList'
import AddForm from './components/AddForm'
import contacts from './services/contacts'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name: '',number: ''})
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const getList = () => {
    contacts
      .getList()
      .then(response => setPersons(response))
  }

  useEffect(() => getList(), [])

  const handleChange = (event, type) => {
    setNewPerson({...newPerson, [type]: event.target.value})
  }

  const createPerson = async event => {
    event.preventDefault()

    const duplicate = persons.filter(person => person.name === newPerson.name)

    if (newPerson.name && newPerson.number) {
      const nameObject = {
        name: newPerson.name,
        number: newPerson.number,
        id: persons.length + 1,
      }

      if (!duplicate.length) {
        await contacts
          .create(nameObject)
          .then(
            setNewPerson({name: '', number: ''}), 
            showMessage(`Added ${nameObject.name}`, 'info')
          )
          .catch(error => showMessage('Server contains a note with this ID'))

        getList()
      } else {
        if (window.confirm('Update person info?')) {
          await contacts
            .update(duplicate[0].id, nameObject)
            .then(setNewPerson({name: '', number: ''}))
            .catch(error => showMessage('Person was already removed from server'))

          getList()
        }
      }

      setNewPerson({name: '', number: ''})
    }
  }

  const deletePerson = async (id) => {
    if (window.confirm('Delete person?')) {
      await contacts
        .deleteContact(id)
        .catch(error => showMessage('Person was already removed from server'))
      getList()
    }
  }

  const showMessage = (content, type) => {
    type === 'info' ? 
      setMessage({text: content, type: 'info'}) :
      setMessage({text: content, type: 'error'})

    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter 
        filter={filter} 
        onChange={event => setFilter(event.target.value)} 
      />
      {message && 
        <div className={`message ${message.type}`}>{message.text}</div>}
      <h2>Add a new</h2>
      <AddForm 
        newName={newPerson.name}
        newNumber={newPerson.number}
        onChangeName={event => handleChange(event, 'name')}
        onChangeNumber={event => handleChange(event, 'number')}
        onSubmit={event => createPerson(event)}
      />
      <h2>Numbers</h2>
      <NumbersList 
        persons={persons} 
        filter={filter} 
        onClick={(id) => deletePerson(id)}
      />
    </div>
  )
}

export default App