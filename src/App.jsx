import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import ThemeToggle from "./components/ThemeToggle";
import Todo from "./assets/direct-hit.png";
import Doing from "./assets/glowing-star.png";
import Done from "./assets/check-mark-button.png";

const oldTask = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTask) || []);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== taskIndex)
    );
  };

  const onDrop = (status, position) => {
    if (activeCard === null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((_, index) => index !== activeCard);

    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    setTasks(updatedTasks);
    setActiveCard(null);
  };

  return (
    <>
      <ThemeToggle />
      <div className="app_title">Task Trek</div>
      <div className="app">
        <TaskForm setTasks={setTasks} />
        <main className="app_main">
          <TaskColumn
            handleDelete={handleDelete}
            image={Todo}
            title="Todo"
            tasks={tasks}
            status="todo"
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
          <TaskColumn
            handleDelete={handleDelete}
            image={Doing}
            title="Doing"
            tasks={tasks}
            status="doing"
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
          <TaskColumn
            handleDelete={handleDelete}
            image={Done}
            title="Done"
            tasks={tasks}
            status="done"
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
        </main>
      </div>
    </>
  );
};

export default App;
