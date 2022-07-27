import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const Form = styled.form`
  width: 100%;
  padding: 10px 0;
`
const Input = styled.textarea`
  width: 100%;
  height: 60px;
  margin: 5px 0 10px 0;
  box-sizing: border-box;
`
const Button = styled.button`
  display: block;
  padding: 5px 30px;
  margin: 0 0 0 auto;
  font-size: 16px;
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (event.target.comment.value) {
      dispatch(addComment(blog, event.target.comment.value))
      dispatch(showNotification('a new comment added', 'info'))
      event.target.comment.value = ''
    } else {
      dispatch(showNotification('something wrong', 'error'))
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='comment'>comment:</label>
        <Input
          type='text-field'
          id='comment'
          name='comment'
        />
      </div>
      <Button>Add comment</Button>
    </Form>
  )
}

export default CommentForm