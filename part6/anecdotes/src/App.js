import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PopularityList from './components/PopularityList'
import AnecdoteForm from './components/AnecdoteForm'
import RandomAnecdote from './components/RandomAnecdote'
import ConnectedNotification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <ConnectedNotification />
      <RandomAnecdote />
      <hr />
      <AnecdoteForm />
      <hr />
      <PopularityList />
    </div>
  )
}

export default App