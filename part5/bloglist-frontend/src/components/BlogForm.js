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

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
        <label htmlFor='title'>title:</label>
        <input
          type='text'
          id='title'
          value={blog.title}
          onChange={({ target }) => handleChange(target.value, 'title')}
        />
      </div>
      <div>
        <label htmlFor='author'>author:</label>
        <input
          type='text'
          id='author'
          value={blog.author}
          onChange={({ target }) => handleChange(target.value, 'author')}
        />
      </div>
      <div>
        <label htmlFor='url'>url:</label>
        <input
          type='text'
          id='url'
          value={blog.url}
          onChange={({ target }) => handleChange(target.value, 'url')}
        />
      </div>
      <button>create</button>
    </form>
  )
}

export default BlogForm