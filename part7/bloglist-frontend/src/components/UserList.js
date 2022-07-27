import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUsers } from '../reducers/userReducer'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const list = users.map((user, index) => {
    return (
      <tr key={`usr__${index}`}>
        <td>{user.username}</td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <table>
      <tbody>
        <tr>
          <th>users</th>
          <th>blogs created</th>
        </tr>
        {list}
      </tbody>
    </table>
  )
}

export default UserList