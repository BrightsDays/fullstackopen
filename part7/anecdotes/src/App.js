import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopularityList from './components/PopularityList'
import AnecdoteForm from './components/AnecdoteForm'
import RandomAnecdote from './components/RandomAnecdote'
import ConnectedNotification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Anecdote from './components/Anecdote'

const App = () => {
  const padding = {padding: 5}

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  return (
    <div>
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
        {anecdote && <Route
          path='/anecdotes/:id' 
          element={
            <Anecdote
              content={anecdote.content}
              points={anecdote.votes} 
            />
          }
        />}
      </Routes>

      <footer style={padding}>Anecodote app for <a href='https://fullstackopen.com' target='_blank' rel='noreferrer'>fullstack open 2022</a></footer>
    </div>
  )
}

export default App