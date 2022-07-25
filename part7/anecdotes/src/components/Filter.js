// import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  // const dispatch = useDispatch()
  const handleChange = (event) => {
    const filter = event.target.value
    props.filterChange(filter)
  }

  return (
    <div>
      <label htmlFor='filter'>Filter: </label>
      <input
        id='filter'
        // onChange={(event) => dispatch(filterChange(event.target.value))}
        onChange={(event) => handleChange(event)}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}
const mapDispatchToProps = {
  filterChange
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter
// export default Filter