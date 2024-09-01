import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthFrom/AuthForm'
import { loginUser } from '../../redux/auth/operations'

import css from './SigninPage.module.css'
import { Section } from '../../components/Section/Section'
import { Container } from '../../components/Container/Container'

const SigninPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignin = (values, { setSubmitting }) => {
    dispatch(loginUser(values)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        navigate('/home') // Redirect to HomePage
      }
      setSubmitting(false)
    })
  }

  return (
    <Section className={css.sectionForm}>
      <Container className={css.resetPasswordContainer}>
        <div className={css.titleFormThumb}>
          <h2 className={css.block_name}>Sign In</h2>
          <AuthForm type="signin" onSubmit={handleSignin} />
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

export default SigninPage
