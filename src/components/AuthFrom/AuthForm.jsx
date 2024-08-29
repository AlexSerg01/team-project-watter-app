import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./AuthForm.module.css"; // Імпортуємо CSS

export default function AuthForm({ type, onSubmit }) {
  const isSignup = type === "signup";

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password is too long")
      .required("Password is required"),
    ...(isSignup && {
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Repeat password is required"),
    }),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        ...(isSignup && { repeatPassword: "" }),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.auth_form}>
          <div>
            <label htmlFor="email">Enter your email:</label>
            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              className={touched.email && errors.email ? css.error_input : ""}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={css.input_error}
            />
          </div>
          <div>
            <label htmlFor="password">Enter your password:</label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={
                touched.password && errors.password ? css.error_input : ""
              }
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.input_error}
            />
          </div>
          {isSignup && (
            <div>
              <label htmlFor="repeatPassword">Repeat password:</label>
              <Field
                type="password"
                name="repeatPassword"
                placeholder="Repeat Password"
                className={
                  touched.repeatPassword && errors.repeatPassword
                    ? css.error_input
                    : ""
                }
              />
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className={css.input_error}
              />
            </div>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
          {!isSignup && <a href="/signup">Sign up</a>}
          {isSignup && <a href="/signin">Sign in</a>}
        </Form>
      )}
    </Formik>
  );
}
