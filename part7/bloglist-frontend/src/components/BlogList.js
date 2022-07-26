import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const BlogList = ({ userName }) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div className="blog__list">
      {(blogs && blogs.length)
        ? blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                userName={userName}
              />
            )
          })
        : 'nothing'}
    </div>
  )
}

BlogList.propTypes = {
  userName: PropTypes.string.isRequired,
}

export default BlogList
