import Blog from './Blog'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initBlogs } from '../reducers/blogReducer'

const BlogList = ({ userName }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <div className='blog__list'>
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
