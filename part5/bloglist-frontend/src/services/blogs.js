import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = ''

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blogPost => {
  const config = {
    headers: { Authorization: token}
  }

  const request = await axios.post(baseUrl, blogPost, config)
  return request.data
}

const update = async blogPost => {
  const config = {
    headers: { Authorization: token}
  }

  const request = await axios.put(`${baseUrl}/${blogPost.id}`, blogPost, config)
  return request.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token}
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request
}

export default {
  getAll,
  create,
  update,
  deleteBlog,
  setToken
}