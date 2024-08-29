import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import UpdatePasswordForm from '../../components/UpdatePasswordForm/UpdatePasswordForm.jsx'
import useUpdatePasswordForm from '../../components/hooks/useUpdatePasswordForm.js'

const UpdatePasswordPage = () => {
  const {
    newPassword,
    configPassword,
    error,
    success,
    loading,
    handlePasswordChange,
    handleSubmit,
  } = useUpdatePasswordForm()

  const navigate = useNavigate()

  const { verificationToken } = useParams()

  return (
    <div>
      <UpdatePasswordForm
        token={verificationToken}
        newPassword={newPassword}
        configPassword={configPassword}
        error={error}
        success={success}
        loading={loading}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
export default UpdatePasswordPage
