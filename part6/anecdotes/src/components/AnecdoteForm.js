// import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)
    props.showNotification(`You added ${content}`, 5000)
    // dispatch(createAnecdote(content))
    // dispatch(showNotification(`You added ${content}`, 5000))
  }

  return (
    <form onSubmit={addAnecdote}>
      <h3>Add anecdote</h3>
      <input name='anecdote' />
      <button type='submit'>add anecdote</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}
const mapDispatchToProps = {
  createAnecdote,
  showNotification
}

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedForm
// export default AnecdoteForm