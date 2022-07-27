const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Post',
    author: 'Max',
    url: 'http://url.com',
    likes: 12
  },
  {
    title: 'Post 2',
    author: 'Jeff',
    url: 'http://url2.com',
    likes: 35
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Post 4',
    author: 'Anna',
    url: 'http://url4.com',
    likes: 31
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  nonExistingId
}