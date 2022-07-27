import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)

    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(initBlogs())
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(newBlog)
    dispatch(initBlogs())
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const newBlog = JSON.parse(JSON.stringify(blog))
    newBlog.comments.push(comment)

    await blogService.update(newBlog)
    dispatch(initBlogs())
  }
}

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer
