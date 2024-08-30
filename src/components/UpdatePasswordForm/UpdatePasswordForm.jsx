import React from 'react'

const UpdatePasswordForm = ({
  token,
  newPassword,
  configPassword,
  error,
  success,
  loading,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newPassword"> New Password</label>
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        value={newPassword}
        onChange={handlePasswordChange}
        required
      />
      <label htmlFor="configPassword"> Confirm Password</label>
      <input
        type="password"
        id="configPassword"
        name="configPassword"
        value={configPassword}
        onChange={handlePasswordChange}
        required
      />
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <button type="submit" disabled={loading}>
        {loading ? `Updating...` : `Update Password`}
      </button>
    </form>
  )
}
export default UpdatePasswordForm
