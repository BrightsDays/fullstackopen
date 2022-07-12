const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
let token = ''

beforeAll(async () => {
  await User.deleteMany({})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash('qwerty', saltRounds)

  const user = await new User({
    username: 'user',
    name: 'user',
    passwordHash
  }).save()
  const userForToken = { username: user.username, id: user._id }

  token = jwt.sign(userForToken, config.SECRET)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('basic tests', () => {
  test('blog are returned a json', async () => {
    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('unique identifier property of the blog posts is id', async () => {
    const response = await api.get('/api/blogs')

    response.body.map(blog => expect(blog.id).toBeDefined())
  })
})

describe('crud tests', () => {
  test('a valid blog can be created', async () => {
    const newBlog = {
      title: 'Post 3',
      author: 'Jim',
      url: 'http://url3.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(item => item.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Post 3')
  })

  test('single blog can be readed', async () => {
    const responseBeforeDel = await api.get('/api/blogs')
    const id = responseBeforeDel.body[0].id

    await api
      .get(`/api/blogs/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('single blog can be updated', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    const newBlog = {
      title: 'New post',
      author: 'Mark',
      url: 'http://url-new.com',
      likes: 25
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(200)

    const updatedBlog = await api.get(`/api/blogs/${id}`)
    newBlog.id = id
    expect(updatedBlog.body).toEqual(newBlog)
  })

  test('single blog can be deleted', async() => {
    const newBlog = {
      title: 'Post 3',
      author: 'Jim',
      url: 'http://url3.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)

    const responseBeforeDel = await api.get('/api/blogs')
    const id = responseBeforeDel.body[2].id

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const responseAfterDel = await api.get('/api/blogs')

    expect(!responseAfterDel.body.filter(blog => blog.id === id))
  })
})

describe('validation tests', () => {
  test('missed like property have default value 0', async () => {
    const newBlog = {
      title: 'Post 3',
      author: 'Jim',
      url: 'http://url3.com'
    }

    const request = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(request.body.likes === 0)
  })

  test('blog can\'t be created without title or url', async () => {
    const blogWithoutUrl = {
      title: 'Post',
      author: 'Jim',
      likes: 3
    }
    const blogWithoutTitle = {
      author: 'Jim',
      url: 'http://url3.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutUrl)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => mongoose.connection.close())