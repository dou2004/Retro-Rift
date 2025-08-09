function TodoItem({ task, onToggle, setOpenDelete, setTaskToDelete, setTaskToEdit, setOpenEdit }) {
  return (
    <li style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          marginLeft: "10px",
          flex: 1,
        }}
      >
        {task.text}
      </span>
      <button
        onClick={() => {
          setTaskToEdit(task);
          setOpenEdit(true);
        }}
        style={{ marginLeft: "5px" }}
      >
        ✏️
      </button>
      <button
        onClick={() => {
          setOpenDelete(true);
          setTaskToDelete(task);
        }}
      >
        🗑️
      </button>
    </li>
  );
}

export default TodoItem;