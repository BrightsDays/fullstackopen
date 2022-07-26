import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.content)
    return (
      <p className={`${notification.type} message`}>{notification.content}</p>
    )
}

export default Notification
