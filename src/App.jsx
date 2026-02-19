import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

function App() {

    const token = localStorage.getItem("token");

    return (

        <div>

            <h1>Task Manager</h1>

            {token ? <Dashboard /> : <Login />}

        </div>

    );

}

export default App;
