import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const PopularityList = () => {
  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <div>
      <h3>All anecdotes</h3>
      {anecdotes
        .slice()
        .sort((a, b) => {
          return b.votes - a.votes})
        .map(item => {
          return (
            <Anecdote
              key={item.id}
              content={item.content}
              points={item.votes}
            />
          )
      })}
    </div>
  )
}

export default PopularityList