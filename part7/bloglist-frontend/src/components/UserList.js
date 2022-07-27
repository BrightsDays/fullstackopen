import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initUsers } from '../reducers/userReducer'
import styled from 'styled-components'

const Table = styled.table`
  padding: 10px;
`
const Raw = styled.tr`
  text-align: left;
`
const Item = styled.td`
  padding-right: 10px;
  text-align: left;
`
const NavLink = styled(Link)`
  line-height: 25px;
  padding: 5px 0;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const list = users.map((user, index) => {
    return (
      <tr key={`usr__${index}`}>
        <Item>
          <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
        </Item>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <Table>
      <tbody>
        <Raw>
          <th>users</th>
          <th>blogs created</th>
        </Raw>
        {list}
      </tbody>
    </Table>
  )
}

export default UserList