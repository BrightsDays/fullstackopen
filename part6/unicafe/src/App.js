import { useSelector } from 'react-redux'
import Controls from './components/Controls'
import Statistic from './components/Statistic'

const App = () => {
  const feedback = useSelector(state => state)

  return (
    <div>
      <h1>give feedback</h1>
      <Controls />
      <Statistic feedback={feedback} />
    </div>
  )
}

export default App