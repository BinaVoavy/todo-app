import { useState } from "react";
import { useStates } from "../../../context/stateContext";
import AddTask from "./AddTask/AddTask";
import AddTaskForm from "./AddTaskForm/AddTaskForm";
import "./Main.css";
import Tasks from "./Tasks/Tasks";

function Main() {
  const state = useStates();
  const [addTask, setAddTask] = useState(false);
  return (
    <div className="app_right">
      <h1>{state.active.name}</h1>
      <Tasks />
      {addTask && <AddTaskForm cancel={() => setAddTask(!addTask)} />}
      <AddTask onClick={() => setAddTask(!addTask)} />
    </div>
  );
}

export default Main;
