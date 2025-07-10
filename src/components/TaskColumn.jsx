import React from "react";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({
  title,
  image,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}) => {
  const taskCount = tasks.filter((task) => task.status === status).length;

  return (
    <>
      <section className="task_column">
        <h2 className="task_column_title">
          <img src={image} alt={title} className="task_column_icon" />
          {title}
          <span className="task_count">({taskCount})</span>
        </h2>

        <DropArea onDrop={() => onDrop(status, 0)} />

        {tasks.map(
          (task, index) =>
            task.status === status && (
              <React.Fragment key={index}>
                <TaskCard
                  key={index}
                  taskText={task.task}
                  tags={task.tags}
                  handleDelete={handleDelete}
                  taskIndex={index}
                  setActiveCard={setActiveCard}
                />
                <DropArea onDrop={() => onDrop(status, index + 1)} />
              </React.Fragment>
            )
        )}
      </section>
    </>
  );
};

export default TaskColumn;
