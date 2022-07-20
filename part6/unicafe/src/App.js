import { useSelector, useDispatch } from 'react-redux'
import Statistic from './components/Statistic'
import { addFeedback } from './reducers/feedbackReducer'

const App = () => {
  const dispatch = useDispatch()
  const feedback = useSelector(state => state)

  return (
    <div>
      <h1>give feedback</h1>
      <button
        onClick={() => dispatch(addFeedback('GOOD'))}
        >good</button>
      <button
        onClick={() => dispatch(addFeedback('NEUTRAL'))}
        >neutral</button>
      <button
        onClick={() => dispatch(addFeedback('BAD'))}
        >bad</button>
      <Statistic feedback={feedback} />
    </div>
  )
}

export default App