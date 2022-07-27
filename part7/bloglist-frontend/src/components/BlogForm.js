import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const Title = styled.h3`
  font-size: 20px;
  margin: 5px 0;
`
const Form = styled.form`
  width: 300px;
  padding-bottom: 10px;
`
const Input = styled.input`
  width: 100%;
  margin: 5px 0 10px 0;
  box-sizing: border-box;
`
const Button = styled.button`
  display: block;
  padding: 5px 30px;
  margin: 0 auto;
  font-size: 16px;
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (event.target.title.value &&
        event.target.author.value &&
        event.target.url.value) {
      dispatch(createBlog({
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value
      }))

      dispatch(
        showNotification(
          `a new blog ${event.target.title.value} by ${event.target.author.value} added`,
          'info'
        )
      )

      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
    } else {
      dispatch(showNotification('fill in all fields', 'error'))
    }
  }

  const inputsList = ['title', 'author', 'url'].map(input => {
    return (
      <div key={input}>
        <label htmlFor={input}>{input}:</label>
        <Input
          type='text'
          id={input}
          name={input}
        />
      </div>
    )
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Create new</Title>
      {inputsList}
      <Button>create</Button>
    </Form>
  )
}

export default BlogForm