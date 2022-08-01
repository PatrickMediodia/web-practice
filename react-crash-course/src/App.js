import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import { useState } from 'react'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Task 1',
      day: 'Day 1',
      reminder: true,
    },
    {
      id: 2,
      text: 'Task 2',
      day: 'Day 2',
      reminder: false,
    },
    {
      id: 3,
      text: 'Task 3',
      day: 'Day 3',
      reminder: true,
    }
  ])

  //toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id 
      ? {...task, reminder: ! task.reminder}
      : task
    ))
  }

  //Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task}
    setTasks([ ...tasks, newTask ]);
  }

  //toggle add form
  const toggleAddForm = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <div className="container">
      <Header onAdd={()=> toggleAddForm} showAdd={showAddTask}/>
      { showAddTask && <AddTask onAdd={addTask}/> }
      { tasks.length > 0 
        ? <Tasks 
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder} />
        : 'No Tasks To Show'
      }
    </div>
  )
}

export default App;