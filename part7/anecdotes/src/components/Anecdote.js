import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Anecdote = ({ content, points, anecdoteId }) => {
  const location = useLocation()

  return (
    <div>
      {location.pathname.length > 11 &&
        <h3>{content}</h3>}
      {location.pathname.length <= 11 &&
      <Link to={`/anecdotes/${anecdoteId}`}>{content}</Link>}
      <p>has {points} votes</p>
    </div>
  )
}

export default Anecdote