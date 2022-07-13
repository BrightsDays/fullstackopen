import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleChange = (value, type) => {
    setBlog({...blog, [type]: value})
  }
  
  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url
    })

    setBlog(({
      title: '',
      author: '',
      url: ''
    }))
  }

  const inputsList = Object.keys(blog).map(input => {
    return (
      <div key={input}>
        <label htmlFor={input}>{input}:</label>
        <input
          type='text'
          id={input}
          value={blog[input]}
          onChange={({ target }) => handleChange(target.value, input)}
        />
      </div>
    )
  })

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      {inputsList}
      <button>create</button>
    </form>
  )
}

export default BlogForm