const LoginForm = ({ username, password, onChangeUsername, onChangePassword, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='login'>login:</label>
        <input
          type='text'
          id='login'
          value={username}
          onChange={onChangeUsername}
        />
      </div>
      <div>
        <label htmlFor='password'>password:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm