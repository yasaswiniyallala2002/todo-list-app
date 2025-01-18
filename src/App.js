import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState(''); // State to manage the input field

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), name: task, completed: false }]);
      setTask(''); // Clear the input field
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>
          Add Task
        </button>
      </div>
      <ul style={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.taskItem}>
            <span
              onClick={() => toggleTaskCompletion(task.id)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'black',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              {task.name}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={styles.iconButton}
              aria-label="Delete task"
            >
              <i className="fas fa-trash" style={styles.trashIcon}></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: 'rgb(8 39 88)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  taskList: {
    listStyle: 'none',
    padding: '0',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  iconButton: {
    marginLeft: '10px',
    padding: '5px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  trashIcon: {
    color: 'red', // Red color for the trash icon
    fontSize: '18px',
  },
};

export default App;
