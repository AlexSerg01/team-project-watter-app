import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../redux/auth/operations'
import AuthForm from '../../components/AuthFrom/AuthForm'

import css from './Signup.module.css'
import { Section } from '../../components/Section/Section'
import { Container } from '../../components/Container/Container'
const SignupPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = (values, { setSubmitting }) => {
    // Очищення поля repeatPassword
    // eslint-disable-next-line no-unused-vars
    const { repeatPassword, ...signupData } = values

    dispatch(registerUser(signupData)).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        navigate('/signin')
      }
      setSubmitting(false)
    })
  }

  return (
    <Section className={css.sectionForm}>
      <Container className={css.resetPasswordContainer}>
        <div className={css.titleFormThumb}>
          <h2 className={css.block_name}>Sign Up</h2>
          <AuthForm type="signup" onSubmit={handleSignup} />
          <p>
            <a className={css.redirektLink} href="/reset-password">
              Forgot your password?
            </a>
          </p>
        </div>
      </Container>
    </Section>
  )
}

export default SignupPage
