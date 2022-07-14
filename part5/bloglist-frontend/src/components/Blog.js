import Toglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, blogUpdated }) => {
  const addLike = async () => {
      const newBlog = {...blog, likes: blog.likes + 1}

      await blogService.update(newBlog)
      blogUpdated()
  }

  return (
    <div className="blog__item">
      <p>{blog.title} {blog.author}</p>

      <Toglable showLabel='view' hideLabel='hide'>
        <p>{blog.url}</p>

        <div className="button-box">
          <p>likes: {blog.likes}</p>
          <button onClick={addLike}>like</button>
        </div>
        
        <p>{blog.user.username}</p>
      </Toglable>
    </div>  
  )
}

export default Blog