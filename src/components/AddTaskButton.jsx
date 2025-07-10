import React from "react";
import "./AddTaskButton.css";

const AddTaskButton = ({ onClick }) => {
  return (
    <button className="add-task-button" onClick={onClick}>
      <span className="add-task-icon">+</span>
      Add New Task
    </button>
  );
};

export default AddTaskButton;
