import Blog from "./Blog"

const BlogList = ({ blogs }) => {
  return (
    <div>
      {
        blogs.length
          ? blogs.map(blog => <Blog key={blog.id} blog={blog} />)
          : 'nothing'
      }
    </div>
  )
}

export default BlogList