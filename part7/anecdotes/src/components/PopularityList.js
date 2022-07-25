import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import Filter from './Filter'

const PopularityList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  return (
    <div>
      <h3>All anecdotes</h3>
      <Filter />
      {anecdotes
        .filter(item => item.content.toLowerCase().includes(filter.byContent.toLowerCase()))
        .sort((a, b) => {
          return b.votes - a.votes})
        .map(item => {
          return (
            <div key={item.id}>
              <hr />
              <Anecdote
                content={item.content}
                points={item.votes}
                anecdoteId={item.id}
              />
            </div>
          )
      })}
    </div>
  )
}

export default PopularityList