import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PopularityList from './components/PopularityList'
import AnecdoteForm from './components/AnecdoteForm'
import RandomAnecdote from './components/RandomAnecdote'
import ConnectedNotification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const padding = {padding: 5}

  return (
    <Router>
      <ConnectedNotification />

      <div>
        <Link style={padding} to='/'>Anecdotes</Link>
        <Link style={padding} to='/daily'>Anecdote of the day</Link>
        <Link style={padding} to='/create'>Create new</Link>
      </div>

      <Routes>
        <Route path='/' element={<PopularityList />} />
        <Route path='/daily' element={<RandomAnecdote />} />
        <Route path='/create' element={<AnecdoteForm />} />
      </Routes>

      <footer style={padding}>Anecodote app for <a href='https://fullstackopen.com' target='_blank' rel='noreferrer'>fullstack open 2022</a></footer>
    </Router>
  )
}

export default App