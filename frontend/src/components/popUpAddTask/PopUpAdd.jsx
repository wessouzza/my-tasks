import React, { useEffect, useRef, useState } from "react";

const PopUpAdd = ({ triggered, setTriggered, save, taskToEdit, errorMsg, setErrorMsg }) => {
  const [taskName, setTaskName] = useState(taskToEdit ? taskToEdit.name : "");
  const [taskCost, setTaskCost] = useState(taskToEdit ? taskToEdit.cost : "");
  const [taskDate, setTaskDate] = useState(taskToEdit ? taskToEdit.deadline : "");
  const [error, setError] = useState("");

  const validateFields =()=>{
    if(taskCost < 0){
      return false;
    }
    return true;
  }

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

  const handleSave = (e) => {
    e.preventDefault();
    if(!validateFields()){
      setError("Valor inválido");
    }else{
      const taskData = {
        name: taskName,
        cost: taskCost,
        deadline: taskDate,
      };
      save(taskData);
      clearFields();
    }
  };

  const clearFields =()=>{
    setTaskName("");
    setTaskCost("");
    setTaskDate("");  
    setError("");
    setErrorMsg("");
  }

  return (
    <>
      {triggered && (
        <form onSubmit={handleSave} className="flex flex-col gap-2 w-[300px] p-2 border rounded-md bg-white shadow-lg">
          <h2 className="font-semibold flex text-start text-slate-500">
            {taskToEdit ? "Editar" : "Nova tarefa"}
          </h2>
          <input
            className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-slate-300"
            type="text"
            placeholder="Nome"
            value={taskName}
            onChange={(e)=> {
              setTaskName(e.target.value)
            }}
            autoFocus
            required
          />
          <input
            className={`p-2 border rounded-md outline-none focus:ring-2
              ${taskCost < 0 ? 'ring-red-400' : 'focus:ring-slate-300'} `}
            type="number"
            placeholder="Custo"
            value={taskCost}
            onChange={(e)=> {
              setTaskCost(e.target.value)
              validateFields();
            }}
            required
          />
          {error && (<p className="text-center font-semibold text-red-400">{error}</p>)}
          <input
            className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-slate-300"
            type="date"
            value={taskDate}
            onChange={(e)=> setTaskDate(e.target.value)}
            required
          />
            {errorMsg ? (<p className="text-center font-semibold text-red-400">{errorMsg}</p>) : ""}
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-700 text-white  w-24 font-bold p-3 rounded"
            >
              Salvar
            </button>
            <button
              onClick={() => {
                setTriggered(false)
                clearFields();
              }}
              className="border-2 border-red-400 text-red-400 w-24 font-bold p-3 rounded transition-all
                hover:bg-red-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default PopUpAdd;
