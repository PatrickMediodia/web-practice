import React from 'react';
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();

    return data;
  }

  //fetch tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();
    
    return data;
  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();

    setTasks(tasks.map((task) => 
      task.id === id 
      ? {...task, reminder : data.reminder}
      : task
    ))
  }

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json()

    setTasks([...tasks, data])

    //setTasks(await fetchTasks())

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task}
    // setTasks([ ...tasks, newTask ]);
  }

  //toggle add form
  const toggleAddForm = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header onAdd={()=> toggleAddForm} showAdd={showAddTask}/>
        <Routes>
          <Route path='/' exact render={(props) => (
            <>
              { showAddTask && <AddTask onAdd={addTask}/> }
              { tasks.length > 0 
              ? <Tasks 
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder} />
              : 'No Tasks To Show'
              }
            </>
          )}
          />
          <Route 
            path='/about' 
            component={About}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
