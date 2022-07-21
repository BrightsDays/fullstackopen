import PopularityList from './components/PopularityList'
import AnecdoteForm from './components/AnecdoteForm'
import RandomAnecdote from './components/RandomAnecdote'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification />
      <RandomAnecdote />
      <hr />
      <AnecdoteForm />
      <hr />
      <PopularityList />
    </div>
  )
}

export default App