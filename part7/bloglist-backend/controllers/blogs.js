const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  blog
    ? response.json(blog)
    : response.status(404).end()
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const user = request.user
  const decodedToken = jwt.verify(token, config.SECRET)

  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, comments } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, comments },
    { new: true, runValidators: true, context: 'query' }
  )

  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(404).end()
})

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const user = request.user
  const decodedToken = jwt.verify(token, config.SECRET)

  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response
      .status(401)
      .json({ error: 'only creator can delete note' })
  }
})

module.exports = blogRouter