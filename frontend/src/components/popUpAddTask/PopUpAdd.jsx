import React, { useEffect, useState } from "react";

const PopUpAdd = ({ triggered, setTriggered, save, taskToEdit }) => {
  const [taskName, setTaskName] = useState(taskToEdit ? taskToEdit.name : "");
  const [taskCost, setTaskCost] = useState(taskToEdit ? taskToEdit.cost : "");
  const [taskDate, setTaskDate] = useState(taskToEdit ? taskToEdit.deadline : "");

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskCost(taskToEdit.cost);
      setTaskDate(taskToEdit.deadline);
    } else {
      setTaskName("");
      setTaskCost("");
      setTaskDate("");
    }
  }, [taskToEdit]);

  const handleSave = () => {
    const taskData = {
      name: taskName,
      cost: taskCost,
      deadline: taskDate,
    };
    save(taskData);
    setTriggered(false);
    setTaskName("");
    setTaskCost("");
    setTaskDate("");
  };

  return (
    <>
      {triggered && (
        <div className="flex flex-col gap-2 w-[300px] p-2 border rounded-md bg-white shadow-lg">
          <h2 className="font-semibold flex text-start text-slate-500">
            {taskToEdit ? "Editar" : "Nova tarefa"}
          </h2>
          <input
            className="p-2 border rounded-md"
            type="text"
            placeholder="Nome"
            value={taskName}
            onChange={(e)=> setTaskName(e.target.value)}
          />
          <input
            className="p-2 border rounded-md"
            type="number"
            placeholder="Custo"
            value={taskCost}
            onChange={(e)=> setTaskCost(e.target.value)}
          />
          <input
            className="p-2 border rounded-md"
            type="date"
            value={taskDate}
            onChange={(e)=> setTaskDate(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="bg-slate-600 hover:bg-slate-700 text-white  w-24 font-bold p-3 rounded"
            >
              Salvar
            </button>
            <button
              onClick={() => setTriggered(false)}
              className="border-2 border-red-400 text-red-400 w-24 font-bold p-3 rounded transition-all
                hover:bg-red-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpAdd;
