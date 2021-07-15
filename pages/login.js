import Form from 'components/Form'
import Link from 'next/link'
import { login } from 'fetch/auth'
import { useRef, useState } from 'react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const emailRef = useRef('')
  const passwordRef = useRef('')

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    const response = await login(payload)
    if (response.failed) setError(response.failed)
    else setSuccess('Success !')
    setLoading(false)
  }

  return (
    <Form
      title='Welcome back'
      onSubmit={onSubmit}
      error={error}
      success={success}
      loading={loading}
    >
      <label>Email</label>
      <div>
        <input required type='email' ref={emailRef} />
      </div>
      <label>Password</label>
      <div>
        <input
          required
          type={showPassword ? 'text' : 'password'}
          ref={passwordRef}
        />
        <img
          src={showPassword ? '/icons/eye-close.svg' : '/icons/eye-open.svg'}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <footer>
        <Link href='/forgotpassword'>forgot password?</Link>
        <button type='submit'>Login</button>
      </footer>
      <span>
        Don't have an account?
        <Link href='/register'> Join us</Link>
      </span>
    </Form>
  )
}
export default Login
