import React, { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Register from "./components/Register";
import SearchBar from "./components/SearchBar";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ ...doc.data(), id: doc.id });
        });
        setTasks(tasksData);
      });
      return () => unsubscribe();
    } else {
      setTasks([]);
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSaveTask = async (task) => {
    if (task.id) {
      const taskDoc = doc(db, "tasks", task.id);
      await updateDoc(taskDoc, task);
    } else {
      await addDoc(collection(db, "tasks"), {
        ...task,
        userId: user.uid,
        completed: false,
        status: "pending",
      });
    }
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (taskId) => {
    const taskDoc = doc(db, "tasks", taskId);
    await deleteDoc(taskDoc);
  };

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const taskDoc = doc(db, "tasks", taskId);
      await updateDoc(taskDoc, {
        completed: !task.completed,
        status: !task.completed ? "completed" : "pending",
      });
    }
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((task) => {
      if (filter === "all") return true;
      return task.status === filter;
    });

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return (
      <div className="App">
        <Login />
        <Register />
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>Aplicación de Tareas</h1>
        <button onClick={handleLogout}>Cerrar Sesión</button>
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
