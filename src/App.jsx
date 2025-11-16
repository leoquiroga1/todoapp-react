import React, { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Register from "./components/Register";
import SearchBar from "./components/SearchBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const handleRegister = (newUser) => {
    // In a real app, this would involve a server call
    setUser(newUser);
  };

  const handleLogin = (credentials) => {
    // In a real app, this would involve a server call
    setUser({ email: credentials.email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSaveTask = (task) => {
    if (task.id) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([
        ...tasks,
        { ...task, id: Date.now(), completed: false, status: "pending" },
      ]);
    }
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              completed: !t.completed,
              status: !t.completed ? "completed" : "pending",
            }
          : t
      )
    );
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => {
      if (filter === "all") return true;
      return task.status === filter;
    });

  if (!user) {
    return (
      <div className="App">
        <Login onLogin={handleLogin} />
        <Register onRegister={handleRegister} />
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <TaskForm onSave={handleSaveTask} taskToEdit={editingTask} />
        <SearchBar onSearch={setSearchTerm} onFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  );
}

export default App;
