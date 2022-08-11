import Authors from './components/Authors'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Books from './components/Books'
import styled from 'styled-components'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'

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
  const [token, setToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const client = useApolloClient()

  const logout = () => {
    setToken('')
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null
    }
    return <div style={{ color: 'red' }}>{errorMessage}</div>
  }

  return (
    <div>
      <nav>
        <LinkButton to="/authors">Authors</LinkButton>
        <LinkButton to="/books">Books</LinkButton>
        {token && <LinkButton to="/add-book">Add Book</LinkButton>}
        {token && (
          <LinkButton to="/login" onClick={logout}>
            Logout
          </LinkButton>
        )}
        {!token && <LinkButton to="/login">Login</LinkButton>}
      </nav>

      <Notify errorMessage={errorMessage} />

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route
          path="/login"
          element={
            !token ? (
              <LoginForm setToken={setToken} setError={notify} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
