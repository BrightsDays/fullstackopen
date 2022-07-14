import Blog from "./Blog"

const BlogList = ({ blogs, addLike, deleteBlog, userName }) => {
  return (
    <div>
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

export default BlogList