import Blog from "./Blog"

const BlogList = ({ blogs, updateBlogs }) => {
  const blogUpdated = () => updateBlogs()

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
                  blogUpdated={blogUpdated} />
                )
              })
          : 'nothing'
      }
    </div>
  )
}

export default BlogList