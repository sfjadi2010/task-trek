import React, { useState } from "react";
import "./InlineTaskForm.css";
import TagInput from "./TagInput";
import TagManager from "./TagManager";
import { parseAndAddTags } from "../utils/tagManager";

const InlineTaskForm = ({ onAddTask, onCancel }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    tags: [],
  });

  const handleTagsChange = (newTags) => {
    // Parse and add any new tags to localStorage
    const allParsedTags = newTags.flatMap((tag) => parseAndAddTags(tag));

    setTaskData((prevData) => ({
      ...prevData,
      tags: allParsedTags,
    }));
  };

  const handleTagSelect = (tagName) => {
    setTaskData((prevData) => {
      if (prevData.tags.includes(tagName)) {
        // If tag is already selected, remove it
        return {
          ...prevData,
          tags: prevData.tags.filter((t) => t !== tagName),
        };
      } else {
        // If tag is not selected, add it
        return {
          ...prevData,
          tags: [...prevData.tags, tagName],
        };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add validation
    if (!taskData.task.trim()) {
      return; // Don't submit if task is empty
    }

    // Add the task with todo status
    onAddTask({
      ...taskData,
      status: "todo",
    });

    // Reset the form
    setTaskData({
      task: "",
      tags: [],
    });
  };

  const handleCancel = () => {
    // Reset the form and close
    setTaskData({
      task: "",
      tags: [],
    });
    onCancel();
  };

  return (
    <div className="inline-task-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          className="inline-task-input"
          placeholder="Enter your task..."
          value={taskData.task}
          onChange={handleChange}
          autoFocus
        />

        <div className="inline-form-tags">
          <TagInput
            onTagsChange={handleTagsChange}
            selectedTags={taskData.tags}
          />

          <TagManager
            selectedTags={taskData.tags}
            onTagSelect={handleTagSelect}
          />
        </div>

        <div className="inline-form-actions">
          <button type="submit" className="save-task-btn">
            Save Task
          </button>
          <button
            type="button"
            className="cancel-task-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InlineTaskForm;
