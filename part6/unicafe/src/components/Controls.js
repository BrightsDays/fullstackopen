import { useDispatch } from 'react-redux'
import { addFeedback } from '../reducers/feedbackReducer'

const Controls = () => {
  const dispatch = useDispatch()

  const list = ['GOOD', 'NEUTRAL', 'BAD'].map((item, index) => {
    return (
      <button
        key={`btn_${index}`}
        onClick={() => dispatch(addFeedback(item))}
        >{item.toLowerCase()}</button>
    )
  })
  
  return <div>{list}</div>
}

export default Controls