import { useSelector } from 'react-redux'

const Notification = () => {
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
    return (
      <div style={style}>
        { notification.content }
      </div>
    )
  }
}

export default Notification