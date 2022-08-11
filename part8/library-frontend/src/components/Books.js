import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import styled from 'styled-components'
import { useState } from 'react'

const NavItem = styled.button`
  padding: 5px;
  text-decoration: none;
  color: black;
  background-color: lightgrey;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`

const Books = () => {
  const [genre, setGenre] = useState('')
  const genres = useQuery(ALL_GENRES)
  const books = useQuery(ALL_BOOKS, { variables: { genre } })

  if (books.loading || genres.loading) return <div>loading...</div>

  const genreList = genres.data.allGenres.map((genre, index) => (
    <NavItem key={`gnr_${index}`} onClick={() => setGenre(genre.name)}>
      {genre.name}
    </NavItem>
  ))

  const bookList = books.data.allBooks.map((book, index) => (
    <tr key={`auth_${index}`}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.published}</td>
    </tr>
  ))

  return (
    <div>
      <h3>Books</h3>
      {genres.data.allGenres.length && (
        <nav>
          {genreList}
          <NavItem onClick={() => setGenre('')}>All</NavItem>
        </nav>
      )}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList}
        </tbody>
      </table>
    </div>
  )
}

export default Books
