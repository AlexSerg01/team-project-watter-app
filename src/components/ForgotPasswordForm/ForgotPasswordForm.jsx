import React from 'react'
import useForgotPasswordForm from './useForgotPasswordForm'
import css from './ForgotPasswordForm.module.css'

const ForgotPasswordForm = () => {
  const { email, error, success, loading, handleEmailChange, handleSubmit } =
    useForgotPasswordForm()

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email"> Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <button type="submit" disabled={loading}>
        {loading ? `Sending...` : `Send`}
      </button>
    </form>
  )
}
export default ForgotPasswordForm
