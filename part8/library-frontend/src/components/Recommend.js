import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const Recommend = () => {
  let favourite = ''
  const user = useQuery(USER)
  if (user.data) favourite = user.data.me.favouriteGenre
  const books = useQuery(ALL_BOOKS, { variables: { genre: favourite } })

  if (books.loading || user.loading) return <div>loading...</div>

  const bookList = books.data.allBooks.map((book, index) => (
    <tr key={`auth_${index}`}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.published}</td>
    </tr>
  ))

  return (
    <div>
      <h3>Reccomendations</h3>
      <p>Books in your favourite genre {favourite}</p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
