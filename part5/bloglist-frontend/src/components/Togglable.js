import { forwardRef, useImperativeHandle, useState } from 'react'

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

export default Togglable