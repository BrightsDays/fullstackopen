import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleUsername = (value) => setUsername(value)
  const handlePassword = (value) => setPassword(value)
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ 
        username, 
        password 
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {
        !user
          ? <LoginForm
              login={username}
              password={password}
              onChangeUsername={({ target }) => handleUsername(target.value)}
              onChangePassword={({ target }) => handlePassword(target.value)}
              onSubmit={(event) => handleLogin(event)}
              errorMessage={errorMessage}
            />
          : <BlogList blogs={blogs} />
      }
    </div>
  )
}

export default App
