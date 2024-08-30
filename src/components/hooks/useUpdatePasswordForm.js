import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UpdatePassword } from '../../fetch/fetch'
import validatePasswordMatch from '../utils/validatePasswordMatch.js'

const useUpdatePasswordForm = (token) => {
  const [newPassword, setNewPassword] = useState('')
  const [configPassword, setConfigPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    if (name === 'newPassword') {
      setNewPassword(value)
    } else if (name === 'configPassword') {
      setConfigPassword(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validatePasswordMatch(newPassword, configPassword)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setLoading(true)

    try {
      await UpdatePassword(token, newPassword)
      setSuccess('Password updated successfully')
      navigate('/signin')
    } catch (error) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return {
    newPassword,
    configPassword,
    error,
    success,
    loading,
    handlePasswordChange,
    handleSubmit,
  }
}

export default useUpdatePasswordForm
