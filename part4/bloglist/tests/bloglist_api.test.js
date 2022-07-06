const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Post 3',
    author: 'Jim',
    url: 'http://url3.com',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(item => item.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('Post 3')
})

test('missed like property have default value 0', async () => {
  const newBlog = {
    title: 'Post 3',
    author: 'Jim',
    url: 'http://url3.com'
  }

  const request = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(request.body.likes === 0)
})

afterAll(() => mongoose.connection.close())