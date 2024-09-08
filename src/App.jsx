import { useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";

const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const Main = lazy(() => import("./pages/WelcomePage/Main"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/ForgotPasswordPage/ForgotPasswordPage")
);
const UpdatePasswordPage = lazy(() =>
  import("./pages/UpdatePasswordPage/UpdatePasswordPage")
);

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("persist:root");
          return <Navigate to="/signin" />;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/welcome" element={<Main />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navigate to="/home" />
              </PrivateRoute>
            }
          />

          <Route path="/reset-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<UpdatePasswordPage />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
