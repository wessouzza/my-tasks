import React, { useEffect, useState } from "react";
import TaskComponent from "../taskComponent/TaskComponent";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { TaskProvider } from "../context/TaskContext";
import { TiPlus } from "react-icons/ti";
import PopUpAdd from "../popUpAddTask/PopUpAdd";
import DeletePopup from "../deletePopup/DeletePopup";


const TaskBoard = () => {

  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [active, setActive] = useState(false);
  const [popup, setPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  //const [tasks, setTasks] = useState([]);
  const [tasks, setTasks] = useState([
    {
      "id": "1",
      "name": "Task taskinha taskita.",
      "cost": 200.0,
      "deadline": "2024-12-30"
    },
    {
      "id": "1",
      "name": "Task taskinha taskita.",
      "cost": 2000.0,
      "deadline": "2024-10-11"
    }
  ]);

  
  const reorderTasks =(list, start, end)=>{
    const result = Array.from(list);
    const [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);
    return result;
  }

  const onDragEnd = (result) => {
    if(!result.destination){
        return;
    }
    const items = reorderTasks(tasks, result.source.index, result.destination.index);
    
   setTasks(items);
  };

  const moveTaskUp = async (index) => {
    await fetch(`/api/tasks/move-up/${tasks[index].id}`, { method: 'POST' });
    if (index > 0) {
      const newTasks = reorderTasks(tasks, index, index - 1);
      setTasks(newTasks);
    }
  };

  const moveTaskDown = async (index) => {
    await fetch(`/api/tasks/move-down/${tasks[index].id}`, { method: 'POST' });
    if (index < tasks.length - 1) {
      const newTasks = reorderTasks(tasks, index, index + 1);
      setTasks(newTasks);
    }
  };

  //CRUD OPERATIONS
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:8080/api/v1/tasks');
    const data = await response.json();
    const tasksWithStringIds = data.map(task => ({
      ...task,
      id: String(task.id),
    }));
    setTasks(tasksWithStringIds);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    const response = await fetch('http://localhost:8080/api/v1/tasks/newTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setPopup(false);
    setTaskToEdit(null);
  };

  const handleEdit = async (taskData) => {
    if (!taskToEdit) return;
  
    const response = await fetch(`http://localhost:8080/api/v1/tasks/updateTask/${taskToEdit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
  
    if (!response.ok) {
      console.error('Erro ao editar a tarefa:', response.statusText);
      return;
    }
  
    const updatedTask = await response.json();
    setTasks(tasks.map(task => (task.id === taskToEdit.id ? updatedTask : task))); 
    setPopup(false);
    setTaskToEdit(null);
    console.log("Cliquei para editar mas...")
  };
  
  const handleDeletePrompt = (id) => {
    setTaskIdToDelete(id);
    setDeletePopup(true);
  };

  const handleDelete = async () => {
    if (taskIdToDelete) {
      await fetch(`http://localhost:8080/api/v1/tasks/deleteTask/${taskIdToDelete}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== taskIdToDelete));
      setDeletePopup(false);
      setTaskIdToDelete(null);
    }
  };


  return (
    <>
      <section className="flex flex-col my-6 sm:mx-6 overflow-hidden">
        <TaskProvider>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" type="list" direction="vertical">
            {(provided) => (
              <article className="flex flex-col gap-5 w-auto sm:w-[700px] m-2 p-4 rounded-md border bg-slate-50"
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                {tasks.length === 0 ? (
                  <h1 className="text-center font-bold text-lg text-slate-400">Adicione suas tarefas!</h1>
                ):(
                  tasks.map((task, index) => (
                    <TaskComponent
                      key={task.id}
                      task={task}
                      index={index}
                      showEdit={()=> {
                        setTaskToEdit(task)
                        setPopup(true)
                      }}
                      showDelete={()=> handleDeletePrompt(task.id)}
                      onMoveUp={()=> moveTaskUp(index)}
                      onMoveDown={()=> moveTaskDown(index)}
                    />
                  ))
                )}
                {provided.placeholder}
              </article>
            )}
          </Droppable>
        </DragDropContext>
        </TaskProvider>
        <div className="flex justify-end p-2">
            <button className="flex bg-slate-600 justify-center text-white items-center rounded-full size-11 
                transition-all cursor-pointer hover:w-40 hover:shadow-md"
                onClick={()=> {
                  setTaskToEdit(null);
                  setPopup(true);
                }}
                onMouseEnter={()=> setActive(true)}
                onMouseLeave={()=> setActive(false)}
                >
                <TiPlus />
                <p className={`font-semibold text-white ${active ? 'flex' : 'hidden'}`}
                >
                  Adicionar tarefa
                </p>
            </button>
        </div>
      </section>
        <div className="top-40 absolute items-center m-auto">
            <PopUpAdd
            triggered={popup}
            setTriggered={setPopup}
            save={taskToEdit ? handleEdit : handleAddTask}
            taskToEdit={taskToEdit}
            />
            <DeletePopup
            triggered={deletePopup}
            setTriggered={setDeletePopup}
            deleteTask={()=> handleDelete()}
            />
        </div>
    </>
  );
};

export default TaskBoard;
