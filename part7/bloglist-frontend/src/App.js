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
import UserPage from './components/User'
import BlogPage from './components/Blog'

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

  return (<div>
    <h2>blogs</h2>
    <Notification />

    {!user
      ? (
        <LoginForm />
      )
      : (
        <div>
          <nav>
            <Link style={padding} to='/blogs'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            <span style={padding}>{user.username} is logged in</span>
            <button style={padding} onClick={() => dispatch(logout())}>log out</button>
          </nav>

          <Routes>
            <Route path='/' element='Blog app' />
            <Route path='/blogs' element={
              <div>
                <Togglable showLabel="new blog" hideLabel="cancel" ref={addBlogRef}>
                  <BlogForm />
                </Togglable>
                <BlogList userName={user.username} />
              </div>
            } />
            <Route path='/blogs/:id' element={<BlogPage />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<UserPage />} />
          </Routes>
        </div>
      )}
  </div>)
}

export default App
