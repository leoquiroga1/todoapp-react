import React, { useState, useEffect } from "react";

const TaskForm = ({ onSave, taskToEdit }) => {
  const [task, setTask] = useState(
    taskToEdit || {
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
    }
  );

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    setTask({ title: "", description: "", dueDate: "", priority: "Medium" });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={task.description}
        onChange={handleChange}
      ></textarea>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="High">Alta</option>
        <option value="Medium">Media</option>
        <option value="Low">Baja</option>
      </select>
      <button type="submit">Guardar Tarea</button>
    </form>
  );
};

export default TaskForm;
