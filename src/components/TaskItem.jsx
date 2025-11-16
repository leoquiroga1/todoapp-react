import React from "react";

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-item-header">
        <h3>{task.title}</h3>
        <div className="task-item-actions">
          <button onClick={() => onToggleComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
      <p>{task.description}</p>
      <div className="task-item-footer">
        <span>Due: {task.dueDate}</span>
        <span>Priority: {task.priority}</span>
      </div>
    </div>
  );
};

export default TaskItem;
