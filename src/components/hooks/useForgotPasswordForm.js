import { useState } from 'react'
import validateForgotPasswordEmail from '../utils/validateForgotPasswordEmail'
import { sendForgotPasswordEmail } from '../../fetch/fetch'
const useForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Обробник під час введення емейла в формі
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  // Обробник під час відправлення форми
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Валідація емейла
    if (!validateForgotPasswordEmail(email)) {
      setError('Invalid email address')
      return
    }

    setError('')
    setLoading(true)

    try {
      //Відправлення запиту POST на сервер для відновлення пароля
      const result = await sendForgotPasswordEmail(email)
      setSuccess('Check your email for further instructions.')
    } catch (error) {
      setError(error.message || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }
  return { email, error, success, loading, handleEmailChange, handleSubmit }
}

export default useForgotPasswordForm
