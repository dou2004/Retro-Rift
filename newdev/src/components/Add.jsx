import { useState } from "react";

function Add({ handleAddTask, close }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Task cannot be empty");
      return;
    }
    handleAddTask(input);
    setInput("");
  };
   console.log("Add modal closed"); // Place this before return if needed

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Task</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          placeholder="Enter new task"
          autoFocus
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Add</button>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Add;