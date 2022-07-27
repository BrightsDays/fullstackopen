import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
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
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            )
          })
        : 'nothing'}
    </div>
  )
}

export default BlogList
