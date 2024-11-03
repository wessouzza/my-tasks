import React from "react";

const DeletePopup = ({ triggered, setTriggered, deleteTask }) => {
  return (
    <>
      {triggered && (
        <div className="flex flex-col gap-2 w-[300px] p-2 border rounded-md bg-white shadow-lg">
          <h2 className="font-semibold flex text-start text-slate-500">
            Deseja realmente excluir?
          </h2>
          <div className="flex justify-end gap-2">
            <button
              onClick={deleteTask}
              className="bg-slate-600 hover:bg-slate-700 text-white  w-24 font-bold p-3 rounded"
            >
              Excluir
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

export default DeletePopup;
