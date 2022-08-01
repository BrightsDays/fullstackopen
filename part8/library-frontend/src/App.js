import Authors from './components/Authors'
import { Routes, Route, Link } from 'react-router-dom'
import Books from './components/Books'
import styled from 'styled-components'
import BookForm from './components/BookForm'

const LinkButton = styled(Link)`
  padding: 5px;
  text-decoration: none;
  color: black;
  background-color: lightgrey;
  &:hover {
    background-color: grey;
  }
`

const App = () => {
  return (
    <div>
      <nav>
        <LinkButton to="/authors">Authors</LinkButton>
        <LinkButton to="/books">Books</LinkButton>
        <LinkButton to="/add-book">Add Book</LinkButton>
      </nav>

      <Routes>
        <Route path="/" element={<h3>Main</h3>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<BookForm />} />
      </Routes>
    </div>
  )
}

export default App
