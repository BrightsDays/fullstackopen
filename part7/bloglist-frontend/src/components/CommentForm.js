import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='comment'>comment:</label>
        <input
          type='text'
          id='comment'
          name='comment'
        />
      </div>
      <button>Add comment</button>
    </form>
  )
}

export default CommentForm