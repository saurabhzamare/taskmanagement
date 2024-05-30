import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TaskBoard from './components/TaskBoard';
import axios from 'axios';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    // Fetch tasks from the server
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data));
  
      // Handle task updates from the server
    socket.on('task updated', (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task)
      );
    });

    // Handle task deletes from the server
    socket.on('task deleted', (deletedTaskId) => {
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== deletedTaskId));
    });

    return () => socket.disconnect();
  }, [socket]);
  
// addtask functionality
  const addTask = async (title) => {
    const response = await axios.post('http://localhost:5000/tasks', { title });
    const newTask = response.data;
    setTasks([...tasks, newTask]);
    socket.emit('task updated', newTask);
  };
  
// update task functionality
  const updateTask = async (id, updates) => {
    const response = await axios.put(`http://localhost:5000/tasks/${id}`, updates);
    const updatedTask = response.data;
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    socket.emit('task updated', updatedTask);
  };

  // delete task functionality
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
    socket.emit('task deleted', id);
  };
  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  return (
    <div className="App">
       <form onSubmit={handleNewTaskSubmit}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
        />
        <button type="submit">Add Task</button>
      </form>  
      <TaskBoard tasks={tasks} setTasks={setTasks} socket={socket} onAddTask={addTask} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
    </div>
  );
}

export default App;
