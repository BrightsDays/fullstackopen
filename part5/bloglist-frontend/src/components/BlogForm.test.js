import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'Title')
  await user.type(author, 'Author')
  await user.type(url, 'www')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  const newFormObj = createBlog.mock.calls[0][0]

  expect(newFormObj.title).toBe('Title')
  expect(newFormObj.author).toBe('Author')
  expect(newFormObj.url).toBe('www')
})