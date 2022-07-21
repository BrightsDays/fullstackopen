import PopularityList from './components/PopularityList'
import AnecdoteForm from './components/AnecdoteForm'
import RandomAnecdote from './components/RandomAnecdote'

const App = () => {
  return (
    <div>
      <RandomAnecdote />
      <hr />
      <AnecdoteForm />
      <hr />
      <PopularityList />
    </div>
  )
}

export default App