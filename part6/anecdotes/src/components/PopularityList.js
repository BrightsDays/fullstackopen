import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const PopularityList = () => {
  const anecdotes = useSelector(state => state.anecdotes)

  console.log(anecdotes[0])
  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => {
          console.log(a, b);
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