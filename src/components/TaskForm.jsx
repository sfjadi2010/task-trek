import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({setTasks}) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  const checkTag = (tag) => {
    return taskData.tags.some((t) => t === tag);
  };

  const selectTag = (tag) => {
    if (checkTag(tag)) {
      const filterTags = taskData.tags.filter((t) => t !== tag);
      setTaskData((prevData) => {
        return { ...prevData, tags: filterTags };
      });
    } else {
      setTaskData((prevData) => {
        return { ...prevData, tags: [...prevData.tags, tag] };
      });
    }
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
    setTasks((prevTasks) => [
      ...prevTasks, taskData
    ]);

    // reset the form
    setTaskData({
     task: "",
     status: "todo",
     tags: [],
    });
  };

  return (
    <>
      <header className="app_header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            className="task_input"
            placeholder="Enter your task"
            value={taskData.task}
            onChange={handleChange}
          />

          <div className="task_form_bottom_line">
            <div>
              <Tag tagName="HTML" selectTag={selectTag} selected={checkTag("HTML")} />
              <Tag tagName="CSS" selectTag={selectTag} selected={checkTag("CSS")} />
              <Tag tagName="JavaScript" selectTag={selectTag} selected={checkTag("JavaScript")} />
              <Tag tagName="ReactJS" selectTag={selectTag} selected={checkTag("ReactJS")} />
            </div>

            <div>
              <select
                className="task_status"
                name="status"
                onChange={handleChange}
                value={taskData.status}
              >
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>

              <button className="task_submit" type="submit">
                + Add Task
              </button>
            </div>
          </div>
        </form>
      </header>
    </>
  );
};

export default TaskForm;
