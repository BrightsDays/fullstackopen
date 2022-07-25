// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)

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

  if (props.notification.content) {
    return (
      <div style={style}>
        { props.notification.content }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification