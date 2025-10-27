// src/components/TaskManager.jsx
import { useState, useEffect } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskInput.trim(),
        completed: false,
        important: false,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setTaskInput("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleImportant = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "All":
        return true;
      case "Active":
        return !task.completed;
      case "Completed":
        return task.completed;
      case "Important":
        return task.important;
      case "Today":
        return task.date === new Date().toISOString().split("T")[0];
      default:
        return true;
    }
  });

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
      style={{
        backgroundImage: darkMode
          ? "url('https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1470&q=80')"
          : "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/95 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold">🌟 Task Manager</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter new task..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
          />
          <button
            onClick={addTask}
            className="px-5 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-r-lg hover:from-blue-500 hover:to-green-400 transition font-semibold"
          >
            Add
          </button>
        </div>

        <div className="flex justify-between mb-6 flex-wrap gap-2">
          {["All", "Active", "Completed", "Important", "Today"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filter === f
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 rounded-2xl shadow-lg transition transform hover:scale-[1.02] ${
                task.completed
                  ? "bg-green-100 dark:bg-green-800 line-through text-gray-500 dark:text-gray-300"
                  : task.important
                  ? "bg-yellow-100 dark:bg-yellow-700 text-gray-900 dark:text-white"
                  : "bg-white dark:bg-gray-700"
              }`}
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => toggleComplete(task.id)}
              >
                {task.text}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleImportant(task.id)}
                  className="px-2 py-1 rounded bg-yellow-300 dark:bg-yellow-600 hover:bg-yellow-400 dark:hover:bg-yellow-500 transition"
                >
                  ⭐
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-2 py-1 rounded bg-red-400 dark:bg-red-600 text-white hover:bg-red-500 dark:hover:bg-red-500 transition"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
        {filteredTasks.length === 0 && (
          <p className="text-center mt-4 text-gray-500 dark:text-gray-300">
            No tasks to display!
          </p>
        )}
      </div>
    </div>
  );
}

