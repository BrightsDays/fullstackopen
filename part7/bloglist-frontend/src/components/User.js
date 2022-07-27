import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initUsers } from '../reducers/userReducer'
import { useMatch } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  padding: 10px;
`
const Title = styled.h3`
  font-size: 20px;
  margin: 5px 0;
`
const Header = styled.h4`
  margin: 5px 0;
`
const List = styled.ul`
  padding-left: 12px;
`

const UserPage = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (user) return (
    <Container>
      <Title>{user.username}</Title>
      <Header>Added blogs:</Header>
      <List>
        {user.blogs.length
          ? user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
          : <p>none</p>}
      </List>
    </Container>
  )
}

export default UserPage