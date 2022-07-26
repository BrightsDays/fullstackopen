import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, addLike, deleteBlog, userName }) => {
  return (
    <div className='blog__list'>
      {
        blogs.length
          ? blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => {
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  addLike={addLike}
                  deleteBlog={deleteBlog}
                  userName={userName}
                />
              )
            })
          : 'nothing'
      }
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
}

export default BlogList