import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) return <div>loading...</div>

  const list = result.data.allBooks.map((book, index) => (
    <tr key={`auth_${index}`}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.published}</td>
    </tr>
  ))

  return (
    <div>
      <h3>Books</h3>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {list}
        </tbody>
      </table>
    </div>
  )
}

export default Books
