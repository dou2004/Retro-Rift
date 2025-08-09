import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import Add from "./components/Add";
import ConfirmationDelete from "./components/ConfirmationDelete";
import Edit from "./components/Edit";
import "./App.css";

function App() {
  const [State, setState] = useState({
    tasks: [],
    openAdd: false,
    openDelete: false,
    openEdit: false,
    taskToDelete: null,
    taskToEdit: null,
    filter: "all",
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setState((prev) => ({ ...prev, tasks: storedTasks }));
  }, []);

  useEffect(() => {
    if (State.tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(State.tasks));
  }, [State.tasks]);

  const handleAddTask = (input) => {
    if (input.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
      openAdd: false,
    }));
  };

  const handleDelete = (id) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
      openDelete: false,
      taskToDelete: null,
    }));
  };

  const handleToggle = (id) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const handleEdit = (id, newText) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      ),
      openEdit: false,
      taskToEdit: null,
    }));
  };

  const setFilter = (filterValue) => {
    setState((prev) => ({ ...prev, filter: filterValue }));
  };

  const setTaskToEdit = (task) => {
    setState((prev) => ({ ...prev, taskToEdit: task, openEdit: true }));
  };

  const setTaskToDelete = (task) => {
    setState((prev) => ({ ...prev, taskToDelete: task, openDelete: true }));
  };

  const setOpenAdd = (value) => {
    setState((prev) => ({ ...prev, openAdd: value }));
  };

  const setOpenDelete = (value) => {
    setState((prev) => ({ ...prev, openDelete: value }));
  };

  const setOpenEdit = (value) => {
    setState((prev) => ({ ...prev, openEdit: value }));
  };

  const filteredTasks = State.tasks.filter((task) => {
    if (State.filter === "completed") return task.completed;
    if (State.filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <>
      <div className="container">
        <h1>📝 To-Do List</h1>
        <div className="filter-buttons">
          <button
            className={State.filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={State.filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={State.filter === "incomplete" ? "active" : ""}
            onClick={() => setFilter("incomplete")}
          >
            Incomplete
          </button>
        </div>
        <button
          className="add-task-button"
          onClick={() => setOpenAdd(true)}
        >
          Add Task
        </button>
        <ul>
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              setTaskToEdit={setTaskToEdit}
              setOpenDelete={setOpenDelete}
              setTaskToDelete={setTaskToDelete}
              setOpenEdit={setOpenEdit}
            />
          ))}
        </ul>
        {State.openAdd && (
          <Add handleAddTask={handleAddTask} close={() => setOpenAdd(false)} />
        )}
        {State.openDelete && State.taskToDelete && (
          <ConfirmationDelete
            taskToDelete={State.taskToDelete}
            handleDelete={handleDelete}
            close={() => setOpenDelete(false)}
          />
        )}
        {State.openEdit && State.taskToEdit && (
          <Edit
            taskToEdit={State.taskToEdit}
            handleEdit={handleEdit}
            close={() => setOpenEdit(false)}
          />
        )}
      </div>
      <div className="footer">
        <p>Made with ❤️ by Your Name</p>
      </div>
    </>
  );
}

export default App;