import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) return <div>loading...</div>

  const list = result.data.allAuthors.map((author, index) => (
    <tr key={`auth_${index}`}>
      <td>{author.name}</td>
      <td>{author.born}</td>
      <td>{author.bookCount}</td>
    </tr>
  ))

  return (
    <div>
      <h3>Authors</h3>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {list}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
