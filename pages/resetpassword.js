import Form from 'components/Form'
import { useRouter } from 'next/router'
import { resetpassword } from 'fetch/auth'
import { useRef, useState } from 'react'

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const passwordRef = useRef('')
  const passwordConfirmRef = useRef('')
  const router = useRouter()

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
      password: passwordRef.current.value
    }
    const response = await resetpassword(payload, router.query.token)
    if (response.failed) setError(response.failed)
    else setSuccess('Password Changed')
    setLoading(false)
  }

  return (
    <Form
      title='Reset Password'
      onSubmit={onSubmit}
      error={error}
      loading={loading}
      success={success}
    >
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
      <button type='submit'>Reset</button>
    </Form>
  )
}

export default ResetPassword
