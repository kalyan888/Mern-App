import React, { useEffect, useState } from "react";
import axios from "axios";
import "./todoApp.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [validTask, setValidTask] = useState(false);

  const pageLoadServices = async () => {
    const abc = await axios.get("http://localhost:3001/getTodos");
    setTasks(abc.data);
  };

  useEffect(() => {
    pageLoadServices();
  }, []);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const addTask = async () => {
    if (task) {
      let newTask = {
        todoItem: task,
        status: "Pending",
      };
      await axios
        .post("http://localhost:3001/createTodo", newTask)
        .then((response) => {
          console.log(response.status, response.data.token);
        });
      setValidTask(false);
      setTasks([...tasks, newTask]);
      setTask("");
    } else {
      setValidTask(true);
      setTimeout(() => {
        setValidTask(false);
      }, 2000);
    }
  };

  const onClickDelTodo = async (task) => {
    let itemIndex = tasks.indexOf(task);
    const updatedTasks = [...tasks];
    updatedTasks.splice(itemIndex, 1);
    let newTask = {
      todoItem: task,
      status: "Pending",
    };
    await axios
      .delete("http://localhost:3001/deleteTodo", newTask)
      .then((response) => {
        console.log(response.status, response.data.token);
      });
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app-container mt-5">
      <div className="todo-main-header-container">
        <h1 className="todo-main-header mb-4">Todo Application</h1>
      </div>
      <div className="add-new-task-container">
        <input
          type="text"
          name="task"
          value={task}
          onChange={handleTaskChange}
          placeholder="Enter a new task"
          className={`new-task-input ${validTask ? "valid-task" : ""}`}
        />
        <button className="add-new-task-btn" type="submit" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className="todo-items-list-container">
        <div className="todo-list-header-container">
          <h1 className="todo-list-header">Todo List</h1>
        </div>
        <div className="todo-items-container">
          <table className="todo-table-container">
            <thead className="todo-thead">
              <tr className="todo-thead-tr">
                <th className="todo-thead-th todo-thead-th-1">Task</th>
                <th className="todo-thead-th todo-thead-th-2">Status</th>
                <th className="todo-thead-th todo-thead-th-3">Delete</th>
              </tr>
            </thead>
            <tbody className="todo-tbody">
              {tasks.length ? (
                <>
                  {tasks.map((task) => (
                    <tr className="todo-tbody-tr">
                      <td className="todo-tbody-td todo-tbody-td-1">
                        {task.todoItem}
                      </td>
                      <td className="todo-tbody-td todo-tbody-td-2">
                        {task.status}
                      </td>
                      <td className="todo-tbody-td todo-tbody-td-3">
                        <i
                          className="todo-del-icon fa-solid fa-trash-can fa-sm"
                          style={{ color: "#1eae42" }}
                          onClick={() => onClickDelTodo(task)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <h3 className="todo-no-tasks">No Tasks</h3>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
