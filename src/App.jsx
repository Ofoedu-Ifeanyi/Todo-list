
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("")
const [tasks, setTasks] = useState(() => {
 const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  function addTask(){
    if(taskInput.trim() === ""){
      return;
    }
    setTasks([...tasks, {text: taskInput, completed: false, dueDate: dueDate}]);
    setTaskInput("");
    setDueDate("");
  }

  function deleteTask(indexToDelete){
      setTasks(
        tasks.filter((task, index)=> index !== indexToDelete)
      );
  }
  function clearAllTasks(){
    setTasks([])
  }
  function toggleTask(indexToToggle){
    setTasks(
      tasks.map((task, index)=>{
        if(index === indexToToggle){
          return{
            ...task,
            completed: !task.completed
          };
        }
        return task;
      })
    )

  }
  return (
    <div className="todo-container">
      <h1>My Todo List</h1>

      <div className="todo-form">
        <input type="text" value={taskInput} onChange={(event)=>{
          setTaskInput(event.target.value)
        }} placeholder="Enter a task..." />

        <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        <p>Total tasks: {tasks.length} | Completed: {" "}
          {tasks.filter((task) => task.completed).length}
        </p>
        <button className='clear-all' onClick={clearAllTasks}>Clear All</button>
        {tasks.map((task, index) =>{
          return <li key={index}><span style={{color: task.completed? "green" : "red",
            textDecoration:task.completed ? "line-through" : "none"
          }}
          >{task.text}</span>
          {task.dueDate && (
        <span
          className="due-date"
          style={{
            color:
              !task.completed &&
              task.dueDate < new Date().toLocaleDateString("en-CA")
                ? "red"
                : "#64748b"
          }}
        >
          Due: {task.dueDate}
        </span>
      )}
          <button className='complete-btn' onClick={() =>{
            toggleTask(index)
          }}>Complete</button>
           <button className='delete-btn' onClick={() =>{
            deleteTask(index);
          }}>Delete</button></li>
        })}
      </ul>
    </div>
  )
}

export default App
