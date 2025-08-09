import { useState } from "react";

function Edit({ taskToEdit, handleEdit, close }) {
  const [editedText, setEditedText] = useState(taskToEdit.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedText.trim() === "") {
      alert("Task cannot be empty");
      return;
    }
    handleEdit(taskToEdit.id, editedText);
    close();
  };
   console.log("Edit modal closed"); 
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          placeholder="Enter task description"
          autoFocus
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Edit;