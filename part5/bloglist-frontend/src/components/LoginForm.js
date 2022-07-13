const LoginForm = ({ username, password, handleUsername, handlePassword, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='login'>login:</label>
        <input
          type='text'
          id='login'
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
      <button>login</button>
    </form>
  )
}

export default LoginForm