import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    if (event.target.title.value &&
        event.target.author.value &&
        event.target.url.value) {
      dispatch(createBlog({
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value
      }))

      dispatch(
        showNotification(
          `a new blog ${event.target.title.value} by ${event.target.author.value} added`,
          'info'
        )
      )

      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
    } else {
      dispatch(showNotification('fill in all fields', 'error'))
    }
  }

  const inputsList = ['title', 'author', 'url'].map(input => {
    return (
      <div key={input}>
        <label htmlFor={input}>{input}:</label>
        <input
          type='text'
          id={input}
          name={input}
        />
      </div>
    )
  })

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      {inputsList}
      <button>create</button>
    </form>
  )
}

export default BlogForm