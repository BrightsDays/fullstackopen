import { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './reducers/loginReducer'
import UserList from './components/UserList'
import { Routes, Route, Link } from 'react-router-dom'
import UserPage from './components/User'
import BlogPage from './components/Blog'
import './index.css'
import styled from 'styled-components'

const Container = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
`
const Title = styled.h1`
  margin: 10px;
  font-size: 26px;
`
const Navigation = styled.nav`
  position: relative;
  height: 23px;
  background-color: lightgrey;
  padding: 5px;
`
const NavLink = styled(Link)`
  line-height: 25px;
  padding: 5px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
const LoginBlock = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`
const Button = styled.button`
  font-size: 16px;
  margin-left: 10px;
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`
const BlogsContainer = styled.div`
  padding: 10px;
`

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const addBlogRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (<Container>
    <Title>Blog App</Title>
    <Notification />

    {!user
      ? (
        <LoginForm />
      )
      : (
        <div>
          <Navigation>
            <NavLink to='/blogs'>blogs</NavLink>
            <NavLink to='/users'>users</NavLink>
            <LoginBlock>
              <span>{user.username} is logged in</span>
              <Button onClick={() => dispatch(logout())}>log out</Button>
            </LoginBlock>
          </Navigation>

          <Routes>
            <Route path='/' element='Blog app' />
            <Route path='/blogs' element={
              <BlogsContainer>
                <Togglable showLabel="new blog" hideLabel="cancel form" ref={addBlogRef}>
                  <BlogForm />
                </Togglable>
                <BlogList userName={user.username} />
              </BlogsContainer>
            } />
            <Route path='/blogs/:id' element={<BlogPage />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<UserPage />} />
          </Routes>
        </div>
      )}
  </Container>)
}

export default App
