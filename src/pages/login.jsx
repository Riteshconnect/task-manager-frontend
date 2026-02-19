import { useState } from "react";
import API from "../api/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const res = await API.post("/users/login", {
                email,
                password
            });

            alert("Login successful");

            console.log(res.data);

            localStorage.setItem("token", res.data.token);

        } catch (error) {

    console.log("FULL ERROR:", error);
    console.log("RESPONSE:", error.response);

    alert(error.response?.data?.message || "Login failed");

}


    };

    return (

        <div>

            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>

    );

}

export default Login;
