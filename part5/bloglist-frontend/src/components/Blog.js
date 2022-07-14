import Togglable from './Togglable'

const Blog = ({ blog, addLike, deleteBlog, userName }) => {
  return (
    <div className="blog__item">
      <p>{blog.title} {blog.author}</p>

      <Togglable showLabel='view' hideLabel='hide'>
        <p>{blog.url}</p>

        <div className="button-box">
          <p>likes: {blog.likes}</p>
          <button onClick={() => addLike(blog)}>like</button>
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

export default Blog