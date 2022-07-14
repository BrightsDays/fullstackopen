import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({
    content: '',
    type: ''
  })

  const getBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  useEffect(() => getBlogs(), [])
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

  const showMessage = (content, type) => {
    setMessage({ content, type })

    setTimeout(() => setMessage({
      content: '',
      type: ''
    }), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ 
        username, 
        password 
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('Wrong username or password', 'error')
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const createBlog = async (blog) => {
    if (blog.title && blog.author && blog.url) {
      addBlogRef.current()
      await blogService.create(blog)
      getBlogs()

      showMessage(`a new blog ${blog.title} by ${blog.author} added`, 'info')
    } else {
      showMessage('fill in all fields', 'error')
    }
  }

  const deleteBlog = async (id) => {
    if (window.confirm('Delete blog?')) {
      await blogService.deleteBlog(id)
      getBlogs()
    }
  }

  const addLike = async (blog) => {
    const newBlog = {...blog, likes: blog.likes + 1}

    await blogService.update(newBlog)
    getBlogs()
}

  return (
    <div>
      <h2>blogs</h2>
      {
        message.content &&
          <p className={`${message.type} message`}>{message.content}</p>
      }
      {
        !user
          ? <LoginForm
              login={username}
              password={password}
              handleUsername={({ target }) => handleUsername(target.value)}
              handlePassword={({ target }) => handlePassword(target.value)}
              handleSubmit={(event) => handleLogin(event)}
            />
          : <div>
              <p>{user.username} is logged in</p>
              <button onClick={() => handleLogout()}>log out</button>
              <Togglable
                showLabel='new blog' 
                hideLabel='cancel'
                ref={addBlogRef}
              >
                <BlogForm createBlog={createBlog} />
              </Togglable>
              <BlogList 
                blogs={blogs}
                userName={user.username}
                updateBlogs={getBlogs}
                addLike={blog => addLike(blog)}
                deleteBlog={id => deleteBlog(id)}
              />
            </div>
      }
    </div>
  )
}

export default App
