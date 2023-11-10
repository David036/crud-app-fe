import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/feature/home";
import LoginPage from "./components/feature/login";
import SignupPage from "./components/feature/signup";
// import Products from "./components/feature/products";
import Users from "./components/feature/users";
import { AuthContext } from "./context/auth/context";
import { getCurrentUser } from "./services/authService";

import "../src/styles/global.scss";
import Products from "./components/feature/products";

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
          <Route path="/" element={<Home />}>
            <Route path="products" element={<Products />} />
            <Route path="/" element={<Users />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
