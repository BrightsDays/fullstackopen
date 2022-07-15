import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const pressLike = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Post00',
      author: 'Max',
      url: 'http://url3.com',
      likes: 3,
      user: { username: 'Max' }
    }

    container = render(
      <Blog
        blog={blog}
        userName='User'
        addLike={pressLike}
        deleteBlog={() => {}}
      />).container
  })

  test('component renders only title and author', () => {
    const togglable = container.querySelector('.togglableContent')
    expect(togglable).toHaveClass('hidden')
  })

  test('url and likes are shown after show button is ckicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.toggle-button')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveClass('hidden')
  })

  test('if the like button is clicked twice, handler call twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.button--like')

    await user.click(button)
    await user.click(button)

    expect(pressLike.mock.calls).toHaveLength(2)
  })
})