import Form from 'components/Form'
import { forgotpassword } from 'fetch/auth'
import { useRef, useState } from 'react'

const ForgotPassword = () => {
  const emailRef = useRef('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    const payload = {
      email: emailRef.current.value
    }
    const response = await forgotpassword(payload)
    if (response.failed) setError(response.failed)
    else setSuccess('A reset link has sent to your email')
    setLoading(false)
  }

  return (
    <Form
      title='Forgot Password'
      onSubmit={onSubmit}
      error={error}
      success={success}
      loading={loading}
    >
      <label>Email</label>
      <div>
        <input required type='email' ref={emailRef} />
      </div>
      <button type='submit'>submit</button>
    </Form>
  )
}
export default ForgotPassword
