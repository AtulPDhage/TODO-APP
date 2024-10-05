import React, { useState, useEffect } from 'react';

const App = () => {
  // State to manage input data and list of tasks
  const [data, setData] = useState('');
  const [tasks, setTasks] = useState([]);

     
  // Effect to load tasks from localStorage when the app loads
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);  // Load tasks from local storage
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to save tasks to localStorage
  const saveToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Store tasks in local storage
  };

  // Handler to add a task to the list
  const addTask = () => {
    if (data.trim() !== '') {
      const newTasks = [...tasks, data];
      setTasks(newTasks);  // Add the new task to the list
      saveToLocalStorage(newTasks);  // Save updated list to local storage
      setData('');  // Clear the input field after adding the task
    }
  };

  // Handler to delete a task from the list
  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index); // Remove task by index
    setTasks(newTasks);
    saveToLocalStorage(newTasks);  // Save updated list to local storage
  };

  return (
    
    <div className='main w-screen  bg-gray-800 text-white flex items-center flex-col gap-2 font-poppins'>
      <div className='heading w-full flex justify-center p-2 m-2 '>
        <h1 className='text-black bg-pink-100 p-2 rounded-xl border-white text-3xl font-mono font-extrabold shadow-xl shadow-cyan-500'>TODO LIST</h1>
      </div>

      <div className='adder w-full h-1/5  flex justify-center p-2 m-2 gap-2 items-center'>
        <div className='inputbox ml-3 text-black'>
          <input
            type="text"
            className='inputdata w-80 h-10 rounded-lg pl-2'
            value={data} // Bind input value to state
            onChange={(e) => setData(e.target.value)} // Update state on input change
          />
        </div>
        <div className='addbutton '>
          <button className='h-10 w-20 rounded-lg bg-blue-500 hover:bg-blue-700 font-semibold mr-1 ' onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>

      <div className='list w-3/5 h-4/5 sm:w-1/3 text-center text-wrap flex flex-col justify-center p-2 m-2 flex-wrap'>
        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          tasks.map((task, index) => (
            <h1
              key={index}
              className='task-item bg-white text-black p-2 m-2  rounded-lg cursor-pointer'
              onClick={() => deleteTask(index)} // Delete task on click
            >
              {task}
            </h1>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
