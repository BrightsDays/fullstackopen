import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    dispatch(login({
      username: event.target.username.value,
      password: event.target.password.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='login'>username:</label>
        <input
          type='text'
          id='username'
          name='username'
        />
      </div>
      <div>
        <label htmlFor='password'>password:</label>
        <input
          type='password'
          id='password'
          name='password'
        />
      </div>
      <button id='login-button'>login</button>
    </form>
  )
}

export default LoginForm