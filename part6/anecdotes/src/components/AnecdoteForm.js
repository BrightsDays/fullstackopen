import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(addAnecdote(content))
    dispatch(setNotification(`You added ${content}`))
  }

  return (
    <form onSubmit={createAnecdote}>
      <h3>Add anecdote</h3>
      <input name='anecdote' />
      <button type='submit'>add anecdote</button>
    </form>
  )
}

export default AnecdoteForm