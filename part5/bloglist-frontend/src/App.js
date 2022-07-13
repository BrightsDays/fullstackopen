import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
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
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsername = (value) => setUsername(value)
  const handlePassword = (value) => setPassword(value)
  const handleChange = (value, type) => {
    setBlog({...blog, [type]: value})
  }

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

  const handleCreate = (event) => {
    event.preventDefault()
    blogService.create(blog)
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    showMessage(`a new blog ${blog.title} by ${blog.author} added`, 'info')
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
              onChangeUsername={({ target }) => handleUsername(target.value)}
              onChangePassword={({ target }) => handlePassword(target.value)}
              onSubmit={(event) => handleLogin(event)}
            />
          : <div>
              <p>{user.username} is logged in</p>
              <button onClick={() => handleLogout()}>log out</button>
              <CreateBlog
                blog={blog}
                onChangeTitle={({ target }) => handleChange(target.value, 'title')}
                onChangeAuthor={({ target }) => handleChange(target.value, 'author')}
                onChangeUrl={({ target }) => handleChange(target.value, 'url')}
                onSubmit={(event) => handleCreate(event)}
              />
              <BlogList 
                blogs={blogs} 
                username={user.username}
              />
            </div>
      }
    </div>
  )
}

export default App
