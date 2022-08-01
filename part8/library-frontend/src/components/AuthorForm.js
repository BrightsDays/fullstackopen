import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const AuthorForm = () => {
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const options = authors.data.allAuthors.map((author) => {
    return {
      value: author.name,
      label: author.name,
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name.value, born } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h4>Set birthyear</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name </label>
          <Select defaultValue={name} options={options} onChange={setName} />
        </div>
        <div>
          <label htmlFor="born">born </label>
          <input
            id="born"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
