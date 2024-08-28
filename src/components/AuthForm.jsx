import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function AuthForm({ type, onSubmit }) {
  const isSignup = type === "signup";

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("some comment").required("some comment"), //coments
    password: Yup.string().min(6, "comment were is min").required("comment"),
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
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          {isSignup && (
            <div>
              <label htmlFor="repeatPassword">Repeat Password:</label>
              <Field type="password" name="repeatPassword" />
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className="error"
              />
            </div>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
