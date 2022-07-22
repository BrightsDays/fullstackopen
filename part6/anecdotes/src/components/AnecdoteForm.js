import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(showNotification(`You added ${content}`, 5000))
  }

  return (
    <form onSubmit={addAnecdote}>
      <h3>Add anecdote</h3>
      <input name='anecdote' />
      <button type='submit'>add anecdote</button>
    </form>
  )
}

export default AnecdoteForm