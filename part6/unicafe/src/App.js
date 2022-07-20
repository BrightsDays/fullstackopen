import Statistic from './components/Statistic'

const App = ({ store }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => store.dispatch({ type: 'NEUTRAL' })}>neutral</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
      <Statistic feedback={store.getState()} />
    </div>
  )
}

export default App