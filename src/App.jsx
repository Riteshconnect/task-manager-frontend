import { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (newToken) => {

    localStorage.setItem("token", newToken);
    setToken(newToken);

  };

  const handleRegisterSuccess = () => {

    setShowRegister(false);

  };

  if (token) {
    return <Dashboard />;
  }

  return (

    <div className="container">

      {showRegister ? (

        <>
          <Register onRegister={handleRegisterSuccess} />
          <button onClick={() => setShowRegister(false)}>
            Go to Login
          </button>
        </>

      ) : (

        <>
          <Login onLogin={handleLogin} />
          <button onClick={() => setShowRegister(true)}>
            Create Account
          </button>
        </>

      )}

    </div>

  );

}

export default App;
