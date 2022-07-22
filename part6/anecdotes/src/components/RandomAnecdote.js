import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const RandomAnecdote = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  
  const [selectedId, setSelectedId] = useState(0)
  const randomAnecdote = anecdotes.find(item => item.id === selectedId)

  useEffect(() => {
    if (anecdotes.length && !selectedId) chooseRandomAnecdote()
  }, [anecdotes])
  
  const chooseRandomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelectedId(anecdotes[random].id)
  }

  const voteForAnecdote = () => {
    dispatch(addVote(randomAnecdote.id, randomAnecdote))
    dispatch(showNotification(`You voted for ${randomAnecdote.content}`, 5000))
  }

  if (randomAnecdote) return (
    <>
      <h3>Anecdote of the day</h3>
      <Anecdote
        content={randomAnecdote.content}
        points={randomAnecdote.votes}
      />
      <button
        onClick={() => voteForAnecdote()}
        >vote</button>
      <button
        onClick={() => chooseRandomAnecdote()}
        >next anecdote</button>
    </>
  )
}

export default RandomAnecdote