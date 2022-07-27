import { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './reducers/loginReducer'
import './index.css'
import UserList from './components/UserList'
import { Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const addBlogRef = useRef()
  const padding = { padding: 5 }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  return !user
    ? (
      <div>
        <h2>blogs</h2>
        <Notification />
        <LoginForm />
      </div>
    )
    : (
      <div>
        <h2>blogs</h2>
        <Notification />

        <p>{user.username} is logged in</p>
        <button onClick={() => dispatch(logout())}>log out</button>

        <nav>
          <Link style={padding} to='/'>blogs</Link>
          <Link style={padding} to='/users'>users</Link>
        </nav>

        <Routes>
          <Route path='/' element={
            <div>
              <Togglable showLabel="new blog" hideLabel="cancel" ref={addBlogRef}>
                <BlogForm />
              </Togglable>
              <BlogList userName={user.username} />
            </div>
          } />
          <Route path='/users' element={<UserList />} />
        </Routes>
      </div>
    )
}

export default App
