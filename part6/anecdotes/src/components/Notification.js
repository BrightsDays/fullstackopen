import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const style = {
    position: 'fixed',
    left: '5px',
    right: '5px',
    top: '5px',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white'
  }

  if (notification.content) {
    setTimeout(() => dispatch(setNotification(null)), 5000)

    return (
      <div style={style}>
        { notification.content }
      </div>
    )
  }
}

export default Notification