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

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const addBlogRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user
        ? <LoginForm />
        : (
          <div>
            <p>{user.username} is logged in</p>
            <button onClick={() => dispatch(logout())}>log out</button>
            <Togglable showLabel="new blog" hideLabel="cancel" ref={addBlogRef}>
              <BlogForm />
            </Togglable>
            <BlogList userName={user.username} />
          </div>
        )}
      <UserList />
    </div>
  )
}

export default App
