import React from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Draggable } from '@hello-pangea/dnd'
import UpDownButton from '../upDownButton/UpDownButton';


const TaskComponent = ({task, index, showEdit, showDelete, onMoveUp, onMoveDown}) => {

  return (
    <>
        <Draggable draggableId={task.id} index={index}>
            {(provided)=>(
                <div className="flex items-center transition-all hover:drop-shadow-lg"
                 ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}
                >
                <UpDownButton
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                />
                <div className="flex items-center justify-between bg-white p-3 border w-full rounded-l-xl rounded-r-full">
                    <h2 className="w-[260px] font-semibold text-slate-500">{task.name}</h2>
                    <h3 className={`font-semibold p-1 border-2 rounded-md w-24 text-center text-slate-500 ${task.cost >= 1000 ? 'border border-orange-300' : 'border-2'}`}>R${task.cost}</h3>
                    <h3 className="font-semibold text-slate-500 w-20">{task.deadline}</h3>
                    <div className="flex gap-1">
                        <button onClick={()=> showEdit(task)} className="flex justify-center text-lg items-center rounded-full bg-slate-100 cursor-pointer size-11
                            transition-all hover:bg-slate-400 hover:text-white">
                        <MdOutlineModeEdit />
                        </button>
                        <button onClick={()=> showDelete(true)} className="flex justify-center text-lg items-center rounded-full bg-red-100 cursor-pointer size-11
                            transition-all hover:bg-red-400 hover:text-white">
                        <AiOutlineDelete />
                        </button>
                    </div>
                </div>
            </div>
            )}
        </Draggable>
    </>
  )
}

export default TaskComponent