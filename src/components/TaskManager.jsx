import React, { useState, useEffect } from 'react';
import Button from './Button';
import { FaTrash, FaCheck } from 'react-icons/fa';

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('All');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      priority: 'Medium',
    };
    setTasks([newTask, ...tasks]);
    setTaskInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="flex justify-between w-full max-w-2xl mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
        <Button onClick={toggleTheme}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Button>
      </div>

      <div className="flex w-full max-w-2xl mb-4 gap-2">
        <input
          type="text"
          placeholder="Enter new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      <div className="flex gap-2 mb-6">
        {['All', 'Active', 'Completed'].map(f => (
          <Button
            key={f}
            onClick={() => setFilter(f)}
            className={`bg-${filter === f ? 'indigo-500' : 'gray-400'} dark:bg-${filter === f ? 'indigo-600' : 'gray-600'}`}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-3">
        {filteredTasks.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300 text-center">No tasks here!</p>
        )}
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`flex justify-between items-center p-4 rounded-xl shadow-md bg-white dark:bg-gray-700 transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 accent-indigo-500"
              />
              <span className={`text-lg ${task.completed ? 'line-through text-gray-400 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                {task.text}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded-full bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-200">
                {task.priority}
              </span>
              <Button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-600 p-2">
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
