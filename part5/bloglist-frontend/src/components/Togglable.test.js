import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from '../components/Togglable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable showLabel='show...' hideLabel='hide'>
        <div className='testDiv'>
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', () => {
    screen.findByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveClass('hidden')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.toggle-button')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveClass('hidden')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const showButton = container.querySelector('.toggle-button')
    await user.click(showButton)

    const hideButton = container.querySelector('.toggle-button')
    await user.click(hideButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveClass('hidden')
  })
})