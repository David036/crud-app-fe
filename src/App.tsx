import Home from "./components/home";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login";
import SignupPage from "./components/signup";
import { useState } from "react";
import { AuthContext } from "./context/auth/context";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={isAuth}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
