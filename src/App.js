import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      const newTasks = [
        ...tasks,
        { text: task, completed: false, isEditing: false },
      ];
      setTasks(newTasks);
      setTask("");
      saveToLocalStorage(newTasks);
    }
  };

  const handleDeletetask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const toggleEditMode = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isEditing: !task.isEditing } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const handleEditChange = (newText, index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>
      <div>
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "incomplete" ? "active" : ""}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
      </div>

      <ol>
        {filteredTasks.map((t, index) => (
          <li key={index}>
            {t.isEditing ? (
              <input
                type="text"
                value={t.text}
                onChange={(e) => handleEditChange(e.target.value, index)}
              />
            ) : (
              <span
                className={t.completed ? "completed" : ""}
                onClick={() => toggleTaskCompletion(index)}
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {t.text}
              </span>
            )}
            <button onClick={() => toggleEditMode(index)}>
              {t.isEditing ? (
                <i className="fas fa-save"></i>
              ) : (
                <i className="fas fa-pencil-alt"></i>
              )}
              {t.isEditing ? "Save" : "Edit"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeletetask(index);
              }}
            >
              <i className="fas fa-trash"></i>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
