import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => toggleVisibility)

  return (
    <div>
      <div className={visible ? 'hidden' : ''}>
        <button className='toggle-button' onClick={toggleVisibility}>{props.showLabel}</button>
      </div>
      <div className={visible ? '' : 'hidden'}>
        { props.children }
        <button className='toggle-button' onClick={toggleVisibility}>{props.hideLabel}</button>
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