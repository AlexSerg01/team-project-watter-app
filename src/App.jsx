import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
// import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
// import Main from "./pages/WelcomePage/Main";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";

function App() {
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Routes>
        {/* <Route path="/welcome" element={} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/home" element={<PrivateRoute>{}</PrivateRoute>} />
        {/* Redirect to home if user is authenticated */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Add more routes as necessary */}
        <Route path="/reset-password" element={<ForgotPasswordPage />} />
        {/* <Route
          path="/reset-password/:verificationToken"
          element={<ResetPasswordPage />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
