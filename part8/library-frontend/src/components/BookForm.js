import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../queries'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')

  const [createBook] = useMutation(CREATE_BOOK)

  const handleSubmit = (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }

  const addGenre = (event) => {
    event.preventDefault()

    const updatedGenres = genres.concat(genre)
    setGenres(updatedGenres)
    setGenre('')
  }

  return (
    <div>
      <h3>Add book</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title </label>
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author </label>
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="published">published </label>
          <input
            id="published"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <label htmlFor="genre">genre </label>
          <input
            id="genre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={(event) => addGenre(event)}>Add genre</button>
          <br />
          <span>Genres: </span>
          {genres.map((item, index) => (
            <span key={`gnr_${index}`}>{item}, </span>
          ))}
        </div>
        <button>Add</button>
      </form>
    </div>
  )
}

export default BookForm
