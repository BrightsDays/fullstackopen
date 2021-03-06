import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleUsername, handlePassword, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='login'>username:</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={handleUsername}
        />
      </div>
      <div>
        <label htmlFor='password'>password:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={handlePassword}
        />
      </div>
      <button id='login-button'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm