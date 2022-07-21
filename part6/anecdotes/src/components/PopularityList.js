import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const PopularityList = () => {
  const anecdotes = useSelector(state => state)

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
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