import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <label htmlFor='filter'>Filter: </label>
      <input
        id='filter'
        onChange={(event) => dispatch(filterChange(event.target.value))}
      />
    </div>
  )
}

export default Filter