import React, { useEffect, useRef, useState } from "react";

const PopUpAdd = ({ triggered, setTriggered, save, taskToEdit, errorMsg, setErrorMsg }) => {
  const [taskName, setTaskName] = useState("");
  const [taskCost, setTaskCost] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [costError, setCostError] = useState("");

  const nameValidation =()=>{
    if(taskName.length > 30){
      setNameError("Máximo de caracteres: 30");
      return false;
    }

    if(!taskName || !taskName.trim()){
      return false;
    }
    setNameError("");
    return true;
  }

  const costValidation =()=>{
    if(taskCost < 0){
      setCostError("Apenas valores positivos");
      return false;
    }

    if(taskCost.length > 12){
      setCostError("Quantidade de caracteres excedida");
      return false;
    }
    setCostError("");
    return true;
  }
  
  useEffect(()=>{
    costValidation();
  },[taskCost]);

  useEffect(()=>{
    nameValidation();
  },[taskName]);


  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskCost(taskToEdit.cost);
      setTaskDate(taskToEdit.deadline);
    } else {
      clearFields();
    }
  }, [taskToEdit]);

  const handleSave = (e) => {
    e.preventDefault();
    if(!costValidation()){
      setCostError("Valor inválido");
    }else if(!nameValidation()){
      setNameError("Nome inválido");
    }else{
      const taskData = {
        name: taskName,
        cost: taskCost,
        deadline: taskDate,
      };
      clearFields();
      save(taskData);
    }
  };

  const clearFields =()=>{
    if(!taskToEdit){
      setTaskName("");
      setTaskCost("");
      setTaskDate("");  
      setError("");
      setErrorMsg("");
      setNameError("");
      setCostError("");
    }else{
      setTaskName(taskToEdit.name);
      setTaskCost(taskToEdit.cost);
      setTaskDate(taskToEdit.deadline);
      setError("");
      setErrorMsg("");
      setNameError("");
      setCostError("");
    }
  }

  return (
    <>
      {triggered && (
        <form onSubmit={handleSave} className="flex flex-col gap-2 w-[300px] p-2 border rounded-md bg-white shadow-lg">
          <h2 className="font-semibold flex text-start text-slate-500">
            {taskToEdit ? "Editar" : "Nova tarefa"}
          </h2>
          <input
            className={`p-2 border rounded-md outline-none focus:ring-2
              ${nameError ? 'ring-red-400 border border-red-400' : 'focus:ring-slate-300'}`}
            type="text"
            placeholder="Nome"
            value={taskName}
            onChange={(e)=> {
              setTaskName(e.target.value);
              nameValidation();
            }}
            autoFocus
            required
          />
          {nameError && (<span className="text-center font-semibold text-red-400">{nameError}</span>)}
          
          <input
            className={`p-2 border rounded-md outline-none focus:ring-2
              ${taskCost < 0 || costError ? 'ring-red-400 border border-red-400' : 'focus:ring-slate-300'} `}
            type="number"
            placeholder="Custo"
            value={taskCost}
            onChange={(e)=> {
              setTaskCost(e.target.value)
              costValidation();
            }}
            required
          />
          {costError && (<p className="text-center font-semibold text-red-400">{costError}</p>)}
          
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
                setTriggered(false);
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
