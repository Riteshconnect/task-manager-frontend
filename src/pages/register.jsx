import { useState } from "react";
import API from "../api/api";

function Register({ onRegister }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      const res = await API.post("/users/register", {
        name,
        email,
        password,
      });

      alert("Registration successful");

      onRegister();

    } catch (error) {

      alert(error.response?.data?.message || "Registration failed");

    }

  };

  return (

    <div>

      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>

    </div>

  );

}

export default Register;
