import Form from 'components/Form'
import Link from 'next/link'
import { register } from 'fetch/auth'
import { useRef, useState } from 'react'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const usernameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const passwordConfirmRef = useRef('')

  const checkPasswords = () => {
    return passwordRef.current.value === passwordConfirmRef.current.value
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    const result = checkPasswords()
    if (!result) return setError(`Passwords did't match`)

    setLoading(true)
    const payload = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    const response = await register(payload)
    if (response.failed) setError(response.failed)
    else setSuccess('Success')
    setLoading(false)
  }

  return (
    <Form
      title='Join us'
      onSubmit={onSubmit}
      error={error}
      loading={loading}
      success={success}
    >
      <label>Username</label>
      <div>
        <input required type='text' ref={usernameRef} />
      </div>
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
      <label>Confirm Password</label>
      <div>
        <input
          required
          type={showPassword ? 'text' : 'password'}
          ref={passwordConfirmRef}
        />
        <img
          src={showPassword ? '/icons/eye-close.svg' : '/icons/eye-open.svg'}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <footer>
        <button type='submit'>Register</button>
      </footer>
      <span>
        Already have an account?
        <Link href='/login'> signin</Link>
      </span>
    </Form>
  )
}

export default Register
