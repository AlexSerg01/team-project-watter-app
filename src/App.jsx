import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";

// import Layout from "./components/Layout/Layout";
// import HomePage from "./pages/HomePage/HomePage";
// import Main from "./pages/WelcomePage/Main";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage/UpdatePasswordPage";
import SettingModal from "./components/SettingModal/SettingModal";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  const handleSave = (data) => {
    console.log("Saving user data...", data);
    setModalOpen(false); // Закрытие модалки после успешного сохранения
  };

  return (
    <Layout>
      <Router>
        <Routes>
          {/* <Route path="/welcome" element={} /> */}
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/signin"
            element={
              <>
                <SigninPage />
                {/* Кнопка для открытия модального окна */}
                <button onClick={() => setModalOpen(true)}>
                  Open Settings
                </button>
                {/* Модальное окно */}
                <SettingModal
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  userData={{
                    photo: "",
                    gender: "male",
                    name: "David",
                    email: "david401@gmail.com",
                  }}
                  onSave={handleSave}
                />
              </>
            }
          />
          <Route
            path="/home"
            element={<PrivateRoute>{<HomePage />}</PrivateRoute>}
          />
          {/* Redirect to home if user is authenticated */}
          <Route path="/" element={<Navigate to="/home" />} />
          {/* Add more routes as necessary */}
          <Route path="/reset-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:verificationToken"
            element={<UpdatePasswordPage />}
          />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
