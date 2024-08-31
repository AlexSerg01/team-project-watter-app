import { Formik, Form, Field } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { forgotPasswordSelector } from '../../redux/auth/selectors.js'
import { forgotPassword } from '../../redux/auth/operations'
import { Section } from '../Section/Section.jsx'
import { Container } from '../Container/Container.jsx'

import css from './ForgotPasswordForm.module.css'

const ForgotPasswordForm = () => {
  const { isloading } = useSelector(forgotPasswordSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async ({ email }, actions) => {
    try {
      await dispatch(forgotPassword(email)).unwrap()
      actions.resetForm()
      navigate('/signin')
    } catch (error) {
      console.error('Error resetting password:', error)
    }
  }

  return (
    <Section className={css.sectionForm}>
      <Container className={css.resetPasswordContainer}>
        <div className={css.titleFormThumb}>
          <h1 className={css.title}>Forgot your password?</h1>

          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className={css.formContainer}>
                <div className={css.containerEmail}>
                  <p className={css.textInput}>Enter your email</p>
                  <Field
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    className={`${css.inputField} ${
                      errors.email && touched.email ? css.inputError : ''
                    }`}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isloading}
                    className={css.buttonForm}
                  >
                    {isloading ? 'Sending...' : 'Send'}
                  </button>
                </div>
                <Link to="/signin" className={css.redirektLink}>
                  Sign in
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Section>
  )
}

export default ForgotPasswordForm
