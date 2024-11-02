import React from 'react'
import TaskBoard from '../../components/taskBoard/TaskBoard'

const Home = () => {


  return (
    <>
      <header>
          <nav className="p-4 bg-white shadow-md">
            <h1 className="font-bold text-slate-400">My Tasks</h1>
          </nav>
      </header>
      <div className="flex justify-center h-auto w-full">
          <TaskBoard/>
      </div>
    </>
  )
}

export default Home