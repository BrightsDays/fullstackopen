import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { reset: resetAnecdote, ...anecdote } = useField('text')

  const addAnecdote = async (event) => {
    event.preventDefault()
    
    const content = anecdote.value
    resetAnecdote()

    navigate('/')
    dispatch(createAnecdote(content))
    dispatch(showNotification(`You added ${content}`, 5000))
  }

  return (
    <form onSubmit={addAnecdote}>
      <h3>Add anecdote</h3>
      <input {...anecdote} />
      <div>
        <button type='submit'>add anecdote</button>
        <button
          onClick={(event) => resetAnecdote(event)}
          >clear</button>
      </div>
    </form>
  )
}

export default AnecdoteForm