import { useState } from 'react'

const Toglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

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
}

export default Toglable