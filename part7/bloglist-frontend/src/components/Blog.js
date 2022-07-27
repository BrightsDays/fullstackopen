import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <li><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> - {blog.author}</li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog