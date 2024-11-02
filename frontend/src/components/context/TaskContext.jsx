import React, { createContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const moveTaskUp = (index) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(index, 1);
    newTasks.splice(index - 1, 0, movedTask);
    setTasks(newTasks);
  };

  const moveTaskDown = (index) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(index, 1);
    newTasks.splice(index + 1, 0, movedTask);
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, moveTaskUp, moveTaskDown }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return React.useContext(TaskContext);
};
