import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Message = styled.p`
  margin: 10px;
  min-width: 400px;
  width: 400px;
  max-width: 100%;
  padding: 10px;
  background-color: rgb(200, 200, 200);
  border-radius: 10px;
`

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.content)
    return (
      <Message className={`${notification.type} message`}>{notification.content}</Message>
    )
}

export default Notification
