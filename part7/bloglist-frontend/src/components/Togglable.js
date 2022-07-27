import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
  display: block;
  padding: 5px 30px;
  font-size: 16px;
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => toggleVisibility)

  return (
    <div>
      <div className={visible ? 'hidden' : ''}>
        <Button className='toggle-button' onClick={toggleVisibility}>{props.showLabel}</Button>
      </div>
      <div className={`${visible ? '' : 'hidden'} togglableContent`}>
        { props.children }
        <Button className='toggle-button' onClick={toggleVisibility}>{props.hideLabel}</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired
}

export default Togglable