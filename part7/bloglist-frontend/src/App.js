import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './index.css'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlogRef = useRef()

  const handleUsername = (value) => setUsername(value)
  const handlePassword = (value) => setPassword(value)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotification('Wrong username or password', 'error'))
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user ? (
        <LoginForm
          username={username}
          password={password}
          handleUsername={({ target }) => handleUsername(target.value)}
          handlePassword={({ target }) => handlePassword(target.value)}
          handleSubmit={(event) => handleLogin(event)}
        />
      ) : (
        <div>
          <p>{user.username} is logged in</p>
          <button onClick={() => handleLogout()}>log out</button>
          <Togglable showLabel="new blog" hideLabel="cancel" ref={addBlogRef}>
            <BlogForm />
          </Togglable>
          <BlogList userName={user.username} />
        </div>
      )}
    </div>
  )
}

export default App
