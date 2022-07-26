import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, addLike } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <div className="blog__item">
      <p>{blog.title} {blog.author}</p>

      <Togglable showLabel='view' hideLabel='hide'>
        <p>{blog.url}</p>

        <div className="button-box">
          <p className='blog__likes'>likes: {blog.likes}</p>
          <button
            className='button--like'
            onClick={() => dispatch(addLike(blog))}>like</button>
        </div>

        <p>{blog.user.username}</p>
        {
          user.username === blog.user.username &&
            <button onClick={() => dispatch(deleteBlog(blog.id))}>delete</button>
        }
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog