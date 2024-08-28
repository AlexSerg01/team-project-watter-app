import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<p>HomePage</p>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route
          path="/home"
          element={<PrivateRoute>{/*MainPage */}</PrivateRoute>}
        />
        {/* Redirect to home if user is authenticated */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Add more routes as necessary */}
      </Routes>
    </Router>
  );
}

export default App;
