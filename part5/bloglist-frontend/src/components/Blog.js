import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, userName }) => {
  return (
    <div className="blog__item">
      <p>{blog.title} {blog.author}</p>

      <Togglable showLabel='view' hideLabel='hide'>
        <p>{blog.url}</p>

        <div className="button-box">
          <p>likes: {blog.likes}</p>
          <button
            className='button--like'
            onClick={() => addLike(blog)}>like</button>
        </div>

        <p>{blog.user.username}</p>
        {
          userName === blog.user.username &&
            <button onClick={() => deleteBlog(blog.id)}>delete</button>
        }
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
}

export default Blog