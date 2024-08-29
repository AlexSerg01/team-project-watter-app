import Page from '../../components/Page'
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
  return (
    <Page>
      <ForgotPasswordForm />
      <Link to="/sign-in">Sign in</Link>
    </Page>
  )
}

export default ForgotPasswordPage
