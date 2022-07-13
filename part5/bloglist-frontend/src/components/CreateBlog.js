const CreateBlog = ({ blog, handleTitle, handleAuthor, handleUrl, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <div>
        <label htmlFor='title'>title:</label>
        <input
          type='text'
          id='title'
          value={blog.title}
          onChange={handleTitle}
        />
      </div>
      <div>
        <label htmlFor='author'>author:</label>
        <input
          type='text'
          id='author'
          value={blog.author}
          onChange={handleAuthor}
        />
      </div>
      <div>
        <label htmlFor='url'>url:</label>
        <input
          type='text'
          id='url'
          value={blog.url}
          onChange={handleUrl}
        />
      </div>
      <button>create</button>
    </form>
  )
}

export default CreateBlog