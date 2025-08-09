import { useState } from "react"

export default function TaskForm({ onAdd }){
    const [task,setTask]=useState('')
    
    return(
    <form onSubmit={e => {
      e.preventDefault();
      onAdd(task);
      setTask('');
    }}>
      <button>add</button>
      <input type="text"
       value={task}
       onChange={e => setTask(e.target.value)} placeholder="New Task" />
      
    </form>

    )
}
