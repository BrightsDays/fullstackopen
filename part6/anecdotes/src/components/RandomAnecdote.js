import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const RandomAnecdote = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  
  const [selectedId, setSelectedId] = useState(1)
  const randomAnecdote = anecdotes.find(item => item.id === selectedId)
  
  const chooseRandomAnecdote = () => {
    let random = 1

    do {
      random = Math.floor(Math.random() * anecdotes.length)
    } while (random === selectedId || random === 0)

    setSelectedId(anecdotes[random].id)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote
        content={randomAnecdote.content}
        points={randomAnecdote.votes}
      />
      <button
        onClick={() => {dispatch(addVote(randomAnecdote.id))}}
        >vote</button>
      <button
        onClick={() => chooseRandomAnecdote()}
        >next anecdote</button>
    </>
  )
}

export default RandomAnecdote