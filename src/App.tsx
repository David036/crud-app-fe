import Home from "./components/home";

import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./components/login";
import SignupPage from "./components/signup";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/auth/context";
import { getCurrentUser } from "./services/authService";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkingCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const currentUser = await getCurrentUser();

      if (currentUser) {
        setIsAuth(true);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkingCurrentUser();
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
