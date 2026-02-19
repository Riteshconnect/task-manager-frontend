import { useEffect, useState } from "react";
import API from "../api/api";

function Dashboard() {

  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.tasks);

    } catch (error) {

      console.log(error);

    }

  };

  // Create task
  const createTask = async () => {

    try {

      await API.post(
        "/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE TASK — MUST BE INSIDE COMPONENT
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
      if (!token) {
    window.location.href = "/";
  }


    fetchTasks();

  }, []);

  return (

    <div>
        <button onClick={() => {
  localStorage.removeItem("token");
  window.location.href = "/";
}}>
  Logout
</button>


      <h2>Dashboard</h2>

      <h3>Create Task</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <button onClick={createTask}>
        Create Task
      </button>

      <h3>Your Tasks</h3>

      {tasks.length === 0 ? (

        <p>No tasks yet</p>

      ) : (

        tasks.map((task) => (
          <div key={task._id}>

            <h4>{task.title}</h4>

            <p>{task.description}</p>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>

          </div>
        ))

      )}

    </div>

  );

}

export default Dashboard;
