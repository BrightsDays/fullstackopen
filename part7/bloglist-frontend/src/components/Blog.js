import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import { initBlogs } from '../reducers/blogReducer'
import { deleteBlog, addLike } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'

const BlogPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const clickHandler = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(showNotification(`${blog.title} deleted`, 'info'))
  }

  const comments = blog
    ? blog.comments.map((comment, id) => {
      return <li key={`cmt_${id}`}>{comment}</li>
    })
    : null

  if (blog) return (
    <div className="blog__item">
      <p>{blog.title} - {blog.author}</p>
      <p>{blog.url}</p>

      <div className="button-box">
        <p className='blog__likes'>likes: {blog.likes}</p>
        <button
          className='button--like'
          onClick={() => dispatch(addLike(blog))}>like</button>
      </div>

      <p>Added by {blog.user.username}</p>
      {user.username === blog.user.username &&
        <button onClick={() => clickHandler()}>delete</button>}

      <h3>Comments</h3>
      <CommentForm blog={blog} />
      {comments}
    </div>
  )
}

export default BlogPage