const CreateBlog = ({ blog, onChangeTitle, onChangeAuthor, onChangeUrl, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Create new</h2>
      <div>
        <label htmlFor='title'>title:</label>
        <input
          type='text'
          id='title'
          value={blog.title}
          onChange={onChangeTitle}
        />
      </div>
      <div>
        <label htmlFor='author'>author:</label>
        <input
          type='text'
          id='author'
          value={blog.author}
          onChange={onChangeAuthor}
        />
      </div>
      <div>
        <label htmlFor='url'>url:</label>
        <input
          type='text'
          id='url'
          value={blog.url}
          onChange={onChangeUrl}
        />
      </div>
      <button>create</button>
    </form>
  )
}

export default CreateBlog