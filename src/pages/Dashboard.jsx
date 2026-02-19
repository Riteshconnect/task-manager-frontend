import { useEffect, useState } from "react";
import API from "../api/api";

function Dashboard() {

  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

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

  // Start editing
  const startEdit = (task) => {

    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);

  };

  // Update task
  const updateTask = async () => {

    try {

      await API.put(
        `/tasks/${editingTaskId}`,
        {
          title: editTitle,
          description: editDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingTaskId(null);
      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  // Delete task
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

  // Logout
  const logout = () => {

    localStorage.removeItem("token");
    window.location.href = "/";

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  return (

    <div className="container">

      <button onClick={logout}>
        Logout
      </button>

      <h2>Dashboard</h2>

      <h3>Create Task</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <input
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

          <div key={task._id} className="task-card">

            {editingTaskId === task._id ? (

              <>

                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <button onClick={updateTask}>
                  Save
                </button>

                <button onClick={() => setEditingTaskId(null)}>
                  Cancel
                </button>

              </>

            ) : (

              <>

                <h4>{task.title}</h4>

                <p>{task.description}</p>

                <button onClick={() => startEdit(task)}>
                  Edit
                </button>

                <button onClick={() => deleteTask(task._id)}>
                  Delete
                </button>

              </>

            )}

          </div>

        ))

      )}

    </div>

  );

}

export default Dashboard;
