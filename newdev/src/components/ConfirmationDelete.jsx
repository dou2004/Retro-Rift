function ConfirmationDelete({ taskToDelete, handleDelete, close }) {
   console.log("Confirmation modal closed"); // Place this before return if needed
  return (
    <div className="modal"> 
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete "{taskToDelete.text}"?</p>
        <div className="modal-buttons">
          <button onClick={() => handleDelete(taskToDelete.id)}>Delete</button>
          <button onClick={close}>Cancel</button>
         
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDelete;