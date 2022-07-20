import Statistic from './components/Statistic'

const App = ({ store }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button
        onClick={store.dispatch({ type: 'good' })}
        >good</button>
      <button
        onClick={store.dispatch({ type: 'neutral' })}
        >neutral</button>
      <button
        onClick={store.dispatch({ type: 'bad' })}
        >bad</button>
      <Statistic feedback={store.getState()} />
    </div>
  )
}

export default App