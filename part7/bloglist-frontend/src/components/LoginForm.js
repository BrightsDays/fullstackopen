import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import styled from 'styled-components'

const Form = styled.form`
  width: 300px;
  padding: 10px;
`
const Input = styled.input`
  width: 100%;
  margin: 5px 0 10px 0;
  box-sizing: border-box;
`
const Button = styled.button`
  display: block;
  padding: 5px 30px;
  margin: 0 auto;
  font-size: 16px;
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`

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
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='login'>username:</label>
        <Input
          type='text'
          id='username'
          name='username'
        />
      </div>
      <div>
        <label htmlFor='password'>password:</label>
        <Input
          type='password'
          id='password'
          name='password'
        />
      </div>
      <Button id='login-button'>login</Button>
    </Form>
  )
}

export default LoginForm