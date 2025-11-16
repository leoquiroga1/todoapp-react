import React from "react";

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-item-header">
        <h3>{task.title}</h3>
        <div className="task-item-actions">
          <button onClick={() => onToggleComplete(task.id)}>
            {task.completed ? "Deshacer" : "Completar"}
          </button>
          <button onClick={() => onEdit(task)}>Editar</button>
          <button onClick={() => onDelete(task.id)}>Eliminar</button>
        </div>
      </div>
      <p>{task.description}</p>
      <div className="task-item-footer">
        <span>Vencimiento: {task.dueDate}</span>
        <span>Prioridad: {task.priority}</span>
      </div>
    </div>
  );
};

export default TaskItem;
