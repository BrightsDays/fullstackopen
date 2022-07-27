import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initUsers } from '../reducers/userReducer'
import { useMatch } from 'react-router-dom'

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
    <div>
      <h3>{user.username}</h3>
      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserPage